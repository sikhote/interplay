import { Observable } from 'rxjs/Observable';
import { startCase } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import extensions from '../lib/extensions';
import { settingsUpdate } from './settings';
import { filesSave } from './files';

export const cloudGet = () => ({
  type: 'CLOUD_GET',
});

export const cloudGetSuccess = cloudState => ({
  type: 'CLOUD_GET_SUCCESS',
  payload: { cloudState },
});

const cloudGetEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_GET').mergeMap(() => {
    console.log('starting CLOUD_GET');
    const state = getState();
    const settingsCloud = state.settings.cloud;
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });

    const getCloudState = Observable.from(
      dropbox.filesDownload({ path: `${path}/clairic.json` }),
    );

    return getCloudState.map(cloudState => cloudGetSuccess(cloudState));
  });

export const cloudSave = () => ({
  type: 'CLOUD_SAVE',
});

const cloudSaveEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_SAVE').mergeMap(() => {
    const state = getState();
    const settingsCloud = state.settings.cloud;
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });

    return Observable.from(
      dropbox.filesUpload({
        contents: JSON.stringify(state),
        path: `${path}/clairic.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      }),
    );
  });

export const cloudSync = () => ({
  type: 'CLOUD_SYNC',
});

const cloudSyncEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_SYNC').mergeMap(() => {
    const settingsCloud = getState().settings.cloud;
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });

    const syncStart = Observable.of(
      settingsUpdate({ cloud: { date: Date.now(), status: 'syncing' } }),
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
        });

        const saveFiles = files =>
          dropbox
            .filesUpload({
              contents: JSON.stringify(files),
              path: `${path}/clairic.json`,
              mode: { '.tag': 'overwrite' },
              mute: true,
            })
            .then(() => files);

        return getFiles().then(saveFiles);
      })(),
    );

    const syncSuccess = () =>
      settingsUpdate({ cloud: { date: Date.now(), status: 'success' } });

    const syncFail = error => {
      const cloud = { date: Date.now(), status: 'error' };

      if (error.message === 'cancelled') {
        cloud.status = 'cancelled';
      } else {
        const errorMessage =
          error.error && error.error.error_summary
            ? error.error.error_summary
            : 'Unknown error';
        notifier.error(errorMessage);
      }

      return Observable.of(settingsUpdate({ cloud }));
    };

    return syncStart.concat(
      getAndSave
        .mergeMap(files => [filesSave(files), syncSuccess()])
        .catch(syncFail),
    );
  });

export const epics = [cloudGetEpic, cloudSaveEpic, cloudSyncEpic];
