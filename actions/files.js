import { Observable } from 'rxjs/Observable';
import { startCase } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import { lensPath, set } from 'ramda';
import extensions from '../lib/extensions';
import { settingsReplace } from './settings';
import { cloudSave } from './cloud';

export const filesSync = () => ({
  type: 'FILES_SYNC',
});

export const filesSyncSuccess = files => ({
  type: 'FILES_SYNC_SUCCESS',
  payload: { files },
});

const filesSyncEpic = (action$, { getState }) =>
  action$.ofType('FILES_SYNC').mergeMap(() => {
    const settingsCloud = getState().settings.cloud;
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });

    const syncStart = Observable.of(
      settingsReplace(
        set(
          lensPath(['cloud']),
          { ...settingsCloud, date: Date.now(), status: 'syncing' },
          getState().settings,
        ),
      ),
    );

    const getFiles = Observable.from(
      Promise.coroutine(function* co() {
        const getEntries = options => {
          const listPromise = options.cursor
            ? dropbox.filesListFolderContinue({ cursor: options.cursor })
            : dropbox.filesListFolder(options.list);

          return listPromise.then(response => {
            options.entries.push(...response.entries);

            if (getState().settings.cloud.status === 'cancelled') {
              return Promise.reject(new Error('cancelled'));
            }

            return response.has_more
              ? getEntries({ ...options, cursor: response.cursor })
              : options.entries;
          });
        };

        const entries = yield getEntries({
          list: { path, recursive: true },
          entries: [],
        });

        return entries.reduce(
          (files, entry) => {
            if (entry['.tag'] === 'file') {
              const filePath = entry.path_lower.replace(`${path}/`, '');
              const parts = filePath.split('/');
              const fileName = parts.pop().split('.');
              const fileExt = fileName.pop();
              const fileType = Object.keys(extensions).find(exts =>
                extensions[exts].find(ext => ext === fileExt),
              );
              let name = startCase(fileName.join('.'));
              let track = null;

              if (/^[0-9]{2}[" "]/.test(name)) {
                track = Number(name.substring(0, 2));
                name = name.substring(3);
              }

              if (fileType === 'audio') {
                files.audio.push({
                  album: startCase(parts.pop()),
                  artist: startCase(parts.pop()),
                  name,
                  path: filePath,
                  track,
                });
              } else if (fileType === 'video') {
                files.video.push({
                  name: startCase(fileName.join('.')),
                  path: filePath,
                });
              }
            }

            return files;
          },
          { audio: [], video: [] },
        );
      })(),
    );

    const syncSuccess = () =>
      settingsReplace(
        set(
          lensPath(['cloud']),
          { ...settingsCloud, date: Date.now(), status: 'success' },
          getState().settings,
        ),
      );

    const syncFail = error => {
      const cloud = { ...settingsCloud, date: Date.now(), status: 'error' };

      if (error.message === 'cancelled') {
        cloud.status = 'cancelled';
      } else {
        const errorMessage =
          error.error && error.error.error_summary
            ? error.error.error_summary
            : 'Unknown error';
        notifier.error(errorMessage);
      }

      return Observable.of(
        settingsReplace(set(lensPath(['cloud']), cloud, getState().settings)),
      );
    };

    return syncStart.concat(
      getFiles
        .mergeMap(files => [
          filesSyncSuccess(files),
          syncSuccess(),
          cloudSave(),
        ])
        .catch(syncFail),
    );
  });

export const epics = [filesSyncEpic];