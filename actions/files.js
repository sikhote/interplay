import { Observable } from 'rxjs/Observable';
import { startCase } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import extensions from '../lib/extensions';
import { settingsUpdate } from './settings';

export const filesSave = files => ({
  type: 'FILES_SAVE',
  payload: { files },
});

export const filesDropboxSync = () => ({
  type: 'FILES_DROPBOX_SYNC',
});

const filesDropboxSyncEpic = (action$, { getState }) =>
  action$.ofType('FILES_DROPBOX_SYNC').mergeMap(() => {
    const settingsDropbox = getState().settings.dropbox;
    const accessToken = settingsDropbox.key;
    const path = `/${settingsDropbox.path}`;
    const dropbox = new Dropbox({ accessToken });

    const syncStart = Observable.of(
      settingsUpdate({ dropbox: { date: Date.now(), status: 'syncing' } }),
    );

    const getAndSave = Observable.from(
      (() => {
        const getFiles = Promise.coroutine(function* co() {
          const getEntries = options => {
            const listPromise = options.cursor
              ? dropbox.filesListFolderContinue({ cursor: options.cursor })
              : dropbox.filesListFolder(options.list);

            return listPromise.then(response => {
              options.entries.push(...response.entries);

              if (getState().settings.dropbox.status === 'cancelled') {
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
        });

        const saveFiles = files =>
          dropbox
            .filesUpload({
              contents: JSON.stringify(files),
              path: `${path}/clairic.json`,
              mode: { '.tag': 'overwrite' },
              mute: true,
            })
            .then(files);

        return getFiles().then(saveFiles);
      })(),
    );

    const syncSuccess = () =>
      settingsUpdate({ dropbox: { date: Date.now(), status: 'success' } });

    const syncFail = error => {
      const dropbox = { date: Date.now(), status: 'error' };

      if (error.message === 'cancelled') {
        dropbox.status = 'cancelled';
      } else {
        const errorMessage =
          error.error && error.error.error_summary
            ? error.error.error_summary
            : 'Unknown error';
        notifier.error(errorMessage);
      }

      return Observable.of(settingsUpdate({ dropbox }));
    };

    return syncStart.concat(
      getAndSave
        .mergeMap(files => [filesSave(files), syncSuccess()])
        .catch(syncFail),
    );
  });

export const epics = [filesDropboxSyncEpic];
