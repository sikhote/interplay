import { startCase, has, get } from 'lodash';
import Dropbox from 'dropbox';
import moment from 'moment';
import { getFileType } from '../lib/files';
import notifier from '../lib/notifier';
import { cloudSaveFiles } from './cloud';

export const filesGetUrl = ({
  dispatch,
  store: { files, cloud },
  source,
  path: filePath,
  shouldPlay,
}) => {
  const fileIndex = files.findIndex(file => file.path === filePath);
  const file = files[fileIndex];

  // Update state to indicate song was selected and URL is loading
  if (shouldPlay) {
    dispatch({
      type: 'player-update-many',
      payload: {
        source,
        file,
        position: fileIndex,
        loading: true,
        playing: true,
      },
    });
  }

  // If the current linkDate is not too old no need to load a new link
  if (
    has(file, 'urlDate') &&
    moment(file.urlDate).isAfter(moment().subtract(3, 'hours'))
  ) {
    if (shouldPlay) {
      dispatch({ type: 'player-update', payload: ['loading', false] });
    }

    return Promise.resolve();
  }

  const dropbox = new Dropbox({ accessToken: cloud.key });

  return dropbox
    .filesGetTemporaryLink({ path: `/${cloud.path}/${filePath}` })
    .then(({ link: url }) => {
      const newFile = {
        ...file,
        url,
        urlDate: Date.now(),
      };

      dispatch({ type: 'files-update', payload: { file: newFile } });

      if (shouldPlay) {
        dispatch({
          type: 'player-update-many',
          payload: { file: newFile, loading: false },
        });
      }
    })
    .catch(() => notifier.error('Failed to get streaming URL'));
};

export const filesSync = ({ dispatch, store }) => {
  const {
    cloud: { key: accessToken, path },
  } = store;
  const fullPath = `/${path}`;
  const dropbox = new Dropbox({ accessToken });

  // Signal that syncing is starting
  dispatch({
    type: 'cloud-update-many',
    payload: { date: Date.now(), status: 'syncing' },
  });

  const getEntries = ({ cursor, list, entries }) => {
    const listPromise = cursor
      ? dropbox.filesListFolderContinue({ cursor })
      : dropbox.filesListFolder(list);

    return listPromise.then(response => {
      entries.push(...response.entries);

      if (store.cloud.status === 'cancelled') {
        return Promise.reject(new Error('cancelled'));
      }

      return response.has_more
        ? getEntries({ list, entries, cursor: response.cursor })
        : entries;
    });
  };

  return getEntries({
    list: { path: fullPath, recursive: true },
    entries: [],
  })
    .then(entries =>
      entries.reduce((files, entry) => {
        if (entry['.tag'] === 'file') {
          const filePath = entry.path_lower.replace(`${fullPath}/`, '');
          const parts = filePath.split('/').reverse();
          const fileNameParts = parts[0].split('.');
          const type = getFileType(fileNameParts.pop());
          let name = startCase(fileNameParts.join('.'));
          let track;

          if (!type) {
            return files;
          }

          if (type === 'audio' && /^\d{2}[" "]/.test(name)) {
            track = Number(name.substring(0, 2));
            name = name.substring(3);
          }

          files.push({
            name,
            path: filePath,
            link: undefined,
            linkDate: undefined,
            type,
            ...(type === 'audio'
              ? {
                  album: startCase(get(parts, '[1]', '')),
                  artist: startCase(get(parts, '[2]', '')),
                  track,
                }
              : {}),
            ...(type === 'video'
              ? {
                  category: startCase(get(parts, '[1]', '')),
                }
              : {}),
          });
        }

        return files;
      }, []),
    )
    .then(files => {
      dispatch({ type: 'files-replace', payload: files });
      dispatch({
        type: 'cloud-update-many',
        payload: {
          date: Date.now(),
          files: { status: 'synced', date: Date.now() },
          status: 'connected',
        },
      });
      cloudSaveFiles({ store: { ...store, files } });
      notifier.success('Synced files successfully');
    })
    .catch(error => {
      dispatch({
        type: 'cloud-update-many',
        payload: {
          date: Date.now(),
          status: get(error, 'message') === 'cancelled' ? 'cancelled' : 'error',
        },
      });
      notifier.error(get(error, 'error.message') || 'Unknown error');
    });
};
