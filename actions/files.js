import { startCase, has, last, get } from 'lodash';
import { message as notifier } from 'antd';
import Dropbox from 'dropbox';
import moment from 'moment';
import { getFileType } from '../lib/files';
import { settingsReplace } from './settings';
import { cloudSaveFiles } from './cloud';

export const filesUpdate = payload => ({
  type: 'FILES_UPDATE',
  payload,
});

export const filesGetUrl = payload => (dispatch, getState) => {
  const { path: filePath, shouldPlay } = payload;
  const { settings, files } = getState();
  const fileIndex = files.findIndex(file => file.path === filePath);
  const file = files[fileIndex];
  const getNewSettings = newSettings => ({
    ...settings,
    player: {
      ...settings.player,
      ...newSettings,
    },
  });

  // Update state to indicate song was selected and URL is loading
  if (shouldPlay) {
    dispatch(
      settingsReplace(
        getNewSettings({
          file,
          position: fileIndex,
          loading: true,
          playing: true,
        }),
      ),
    );
  }

  // If the current linkDate is not too old no need to load a new link
  if (
    has(file, 'urlDate') &&
    moment(file.urlDate).isAfter(moment().subtract(3, 'hours'))
  ) {
    if (shouldPlay) {
      dispatch(settingsReplace(getNewSettings({ loading: false })));
    }

    return Promise.resolve();
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
      dispatch(filesUpdate({ file }));

      if (shouldPlay) {
        dispatch(settingsReplace(getNewSettings({ file, loading: false })));
      }
    })
    .catch(() => notifier.error('Failed to get streaming URL'));
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
    settingsReplace({
      ...getState().settings,
      cloud: {
        ...settingsCloud,
        date: Date.now(),
        status: 'syncing',
      },
    }),
  );

  const getEntries = ({ cursor, list, entries }) => {
    const listPromise = cursor
      ? dropbox.filesListFolderContinue({ cursor })
      : dropbox.filesListFolder(list);

    return listPromise.then(response => {
      entries.push(...response.entries);

      if (getState().settings.cloud.status === 'cancelled') {
        return Promise.reject(new Error('cancelled'));
      }

      return response.has_more
        ? getEntries({ list, entries, cursor: response.cursor })
        : entries;
    });
  };

  return getEntries({
    list: { path, recursive: true },
    entries: [],
  })
    .then(entries =>
      entries.reduce((files, entry) => {
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

          files.push({
            album: startCase(parts.pop()),
            artist: startCase(parts.pop()),
            name: type === 'video' ? startCase(fileName.join('.')) : name,
            category:
              type === 'video'
                ? parts.length > 1
                  ? startCase(last(parts))
                  : ''
                : '',
            path: filePath,
            track,
            link: null,
            linkDate: null,
            type,
          });
        }

        return files;
      }, []),
    )
    .then(files => {
      // Start using new files
      dispatch(filesReplace(files));

      // Signal that syncing was successful
      dispatch(
        settingsReplace({
          ...getState().settings,
          cloud: {
            ...settingsCloud,
            date: Date.now(),
            status: 'success',
          },
        }),
      );

      // Save files to cloud
      dispatch(cloudSaveFiles());

      notifier.success('Synced files successfully');
    })
    .catch(error => {
      const cloud = { ...settingsCloud, date: Date.now(), status: 'error' };

      if (error.message === 'cancelled') {
        cloud.status = 'cancelled';
      } else {
        notifier.error(get(error, 'error.error_summary') || 'Unknown error');
      }

      // Signal that syncing was not successful
      dispatch(settingsReplace({ ...getState().settings, cloud }));
    });
};
