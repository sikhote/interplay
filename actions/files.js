import { Observable } from 'rxjs/Observable';
import { startCase, set, get, has, last } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import moment from 'moment';
import { getFileType } from '../lib/files';
import { settingsReplace } from './settings';
import { cloudSaveFiles, cloudSaveOther } from './cloud';

export const filesGetUrl = payload => ({
  type: 'FILES_GET_URL',
  payload,
});

export const filesUpdate = payload => ({
  type: 'FILES_UPDATE',
  payload,
});

const filesGetUrlEpic = (action$, { getState }) =>
  action$.ofType('FILES_GET_URL').mergeMap(action => {
    const { source, path: filePath, shouldPlay } = get(action, 'payload', {});
    const state = getState();
    const { settings, files } = state;
    const file = files[source].find(file => file.path === filePath);
    const getNewSettings = file => ({
      ...settings,
      player: {
        ...settings.player,
        source,
        file,
        playing: true,
      },
    });

    // If the current linkDate is not too old
    if (
      has(file, 'urlDate') &&
      moment(file.urlDate).isAfter(moment().subtract(3, 'hours'))
    ) {
      return shouldPlay
        ? Observable.of(file).mergeMap(file => [
            settingsReplace(getNewSettings(file)),
            cloudSaveOther(),
          ])
        : Observable.of();
    }

    const accessToken = settings.cloud.key;
    const path = `/${settings.cloud.path}`;
    const dropbox = new Dropbox({ accessToken });
    const getUrl = Observable.from(
      dropbox
        .filesGetTemporaryLink({ path: `${path}/${filePath}` })
        .then(({ link: url }) =>
          Promise.resolve({
            ...file,
            url,
            urlDate: Date.now(),
          }),
        )
        .catch(() => state),
    );

    return getUrl.mergeMap(file => [
      filesUpdate({ file, source }),
      ...(shouldPlay
        ? [settingsReplace(getNewSettings(file)), cloudSaveOther()]
        : []),
    ]);
  });

export const filesSync = () => ({
  type: 'FILES_SYNC',
});

export const filesReplace = files => ({
  type: 'FILES_REPLACE',
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
        set({ ...getState().settings }, 'cloud', {
          ...settingsCloud,
          date: Date.now(),
          status: 'syncing',
        }),
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
              const type =
                parts[0] === 'videos' ? 'video' : getFileType(fileExt);
              let name = startCase(fileName.join('.'));
              let track = null;

              if (/^[0-9]{2}[" "]/.test(name)) {
                track = Number(name.substring(0, 2));
                name = name.substring(3);
              }

              if (type === 'audio') {
                files.audio.push({
                  album: startCase(parts.pop()),
                  artist: startCase(parts.pop()),
                  name,
                  path: filePath,
                  track,
                  link: null,
                  linkDate: null,
                  type,
                });
              } else if (type === 'video') {
                files.video.push({
                  name: startCase(fileName.join('.')),
                  category: parts.length > 1 ? startCase(last(parts)) : '',
                  path: filePath,
                  link: null,
                  linkDate: null,
                  type,
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
        set({ ...getState().settings }, 'cloud', {
          ...settingsCloud,
          date: Date.now(),
          status: 'success',
        }),
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
        settingsReplace(set({ ...getState().settings }, 'cloud', cloud)),
      );
    };

    return syncStart.concat(
      getFiles
        .mergeMap(files => [
          filesReplace(files),
          syncSuccess(),
          cloudSaveOther(),
          cloudSaveFiles(),
        ])
        .catch(syncFail),
    );
  });

export const epics = [filesSyncEpic, filesGetUrlEpic];
