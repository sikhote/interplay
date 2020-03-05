import { startCase, has, get } from 'lodash';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { getFileType } from '../files';
import getPortal from '../get-portal';

export const filesGetUrl = ({
  dispatch,
  store,
  source,
  path: filePath,
  shouldPlay,
}) => {
  const {
    files,
    cloud: { path },
  } = store;
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

  return getPortal(store)
    .getStream(`/${path}/${filePath}`)
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
    .catch(() =>
      dispatch({
        type: 'notifications-add',
        payload: {
          type: 'error',
          message: 'Failed to get streaming URL',
          id: uuidv4(),
        },
      }),
    );
};

export const filesSync = store => {
  const { path } = store.cloud;
  const fullPath = `/${path}`;

  return getPortal(store)
    .getFiles(fullPath)
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
    );
};
