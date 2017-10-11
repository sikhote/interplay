import { Observable } from 'rxjs/Observable';
import { assocPath } from 'ramda';
import { startCase } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import extensions from '../lib/extensions';

export const settingsUpdate = settings => ({
  type: 'SETTINGS_UPDATE',
  payload: { settings },
});

export const settingsDropboxDelete = () => ({
  type: 'SETTINGS_DROPBOX_DELETE',
});

export const settingsDropboxSync = () => ({
  type: 'SETTINGS_DROPBOX_SYNC',
});

const settingsDropboxSyncEpic = (action$, deps) =>
  Observable.merge(
    action$.filter(action => action.type === 'SETTINGS_DROPBOX_SYNC'),
  ).mergeMap(() => {
    const { getState } = deps;
    const { key: accessToken, path } = getState().settings.dropbox;
    const dbx = new Dropbox({ accessToken });

    const getFiles = Observable.from(
      Promise.coroutine(function* co() {
        const getDropboxEntries = options => {
          const listPromise = options.cursor
            ? dbx.filesListFolderContinue({ cursor: options.cursor })
            : dbx.filesListFolder(options.list);

          return listPromise.then(response => {
            options.entries.push(...response.entries);

            if (getState().settings.dropbox.status === 'cancelled') {
              return Promise.reject(new Error('cancelled'));
            }

            return response.has_more
              ? getDropboxEntries(
                  Object.assign({}, options, { cursor: response.cursor }),
                )
              : options.entries;
          });
        };

        const entries = yield getDropboxEntries({
          list: { path, recursive: true },
          entries: [],
        });

        const files = { audio: [], video: [] };

        if (!entries) {
          return files;
        }

        entries.forEach(entry => {
          if (entry['.tag'] === 'file') {
            const parts = entry.path_lower.split('/');
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
                id: entry.path_lower,
                album: startCase(parts.pop()),
                artist: startCase(parts.pop()),
                name,
                path: entry.path_lower,
                track,
              });
            } else if (fileType === 'video') {
              files.video.push({
                id: entry.path_lower,
                name: startCase(fileName.join('.')),
                path: entry.path_lower,
              });
            }
          }
        });

        return files;
      })(),
    );

    const addFiles = getFiles.concatMap(files =>
      Observable.from(
        dbx.filesUpload({
          contents: JSON.stringify(files),
          path: `${path}/clairic.json`,
          mode: { '.tag': 'overwrite' },
          mute: true,
        }),
      ),
    );

    const syncFilesDone = () =>
      settingsUpdate({
        dropbox: { date: Date.now(), status: 'success' },
      });

    const syncFilesFail = error => {
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

      return settingsUpdate({ dropbox });
    };

    return addFiles
      .map(syncFilesDone)
      .catch(error => Observable.of(syncFilesFail(error)));
  });

export const epics = [settingsDropboxSyncEpic];
