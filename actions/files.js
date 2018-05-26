import { startCase, set, has, last } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import Promise from 'bluebird';
import moment from 'moment';
import { getFileType } from '../lib/files';
import { settingsReplace } from './settings';
import { cloudSaveFiles } from './cloud';

export const filesUpdate = payload => ({
  type: 'FILES_UPDATE',
  payload,
});

export const filesGetUrl = payload => (dispatch, getState) => {
  const { source, path: filePath, shouldPlay } = payload;
  const { settings, files } = getState();
  const fileIndex = files[source].findIndex(file => file.path === filePath);
  const file = files[source][fileIndex];
  const getNewSettings = (file, loading) => ({
    ...settings,
    [source]: {
      ...settings[source],
      position: fileIndex,
    },
    player: {
      ...settings.player,
      source,
      file,
      playing: true,
      loading,
    },
  });

  // If the current linkDate is not too old
  if (
    has(file, 'urlDate') &&
    moment(file.urlDate).isAfter(moment().subtract(3, 'hours'))
  ) {
    if (shouldPlay) {
      dispatch(settingsReplace(getNewSettings(file, false)));
    }

    return Promise.resolve();
  }

  // Update state to indicate song was selected and URL is loading
  if (shouldPlay) {
    dispatch(settingsReplace(getNewSettings(file, true)));
  }

  const accessToken = settings.cloud.key;
  const path = `/${settings.cloud.path}`;
  const dropbox = new Dropbox({ accessToken });

  return dropbox
    .filesGetTemporaryLink({ path: `${path}/${filePath}` })
    .then(({ link: url }) =>
      Promise.resolve({
        ...file,
        url,
        urlDate: Date.now(),
      }),
    )
    .then(file => {
      dispatch(filesUpdate({ file, source }));

      if (shouldPlay) {
        dispatch(settingsReplace(getNewSettings(file, false)));
      }
    })
    .catch(() => notifier.error('Failed to get steaming URL'));
};

export const filesReplace = files => ({
  type: 'FILES_REPLACE',
  payload: { files },
});

export const filesSync = () => (dispatch, getState) => {
  const settingsCloud = getState().settings.cloud;
  const accessToken = settingsCloud.key;
  const path = `/${settingsCloud.path}`;
  const dropbox = new Dropbox({ accessToken });

  // Signal that syncing is starting
  dispatch(
    settingsReplace(
      set({ ...getState().settings }, 'cloud', {
        ...settingsCloud,
        date: Date.now(),
        status: 'syncing',
      }),
    ),
  );

  return Promise.coroutine(function* co() {
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
          const type = parts[0] === 'videos' ? 'video' : getFileType(fileExt);
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
  })
    .then(files => {
      // Start using new files
      dispatch(filesReplace(files));

      // Signal that syncing was successful
      dispatch(
        settingsReplace(
          set({ ...getState().settings }, 'cloud', {
            ...settingsCloud,
            date: Date.now(),
            status: 'success',
          }),
        ),
      );

      // Save files to cloud
      dispatch(cloudSaveFiles(files));

      notifier.success('Synced files successfully');
    })
    .catch(error => {
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

      // Signal that syncing was not successful
      dispatch(
        settingsReplace(set({ ...getState().settings }, 'cloud', cloud)),
      );
    });
};
