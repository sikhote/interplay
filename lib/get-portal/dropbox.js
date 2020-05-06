import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

const checkStatus = ({
  dropbox,
  store: {
    cloud: { path },
  },
}) => () => dropbox.filesGetMetadata({ path: `/${path}` });

const download = ({ dropbox }) => (path) => dropbox.filesDownload({ path });

const upload = ({ dropbox }) => ({ path, contents }) =>
  dropbox.filesUpload({
    contents,
    path,
    mode: { '.tag': 'overwrite' },
    mute: true,
  });

const removeUser = ({
  dropbox,
  store: {
    cloud: { path, user },
  },
}) => () => dropbox.filesDelete({ path: `/${path}/interplay/${user}` });

const getStream = ({ dropbox }) => (path) =>
  dropbox.filesGetTemporaryLink({ path });

const getFiles = ({ dropbox, store }) => (path) => {
  const getEntries = ({ cursor, list, entries }) => {
    const listPromise = cursor
      ? dropbox.filesListFolderContinue({ cursor })
      : dropbox.filesListFolder(list);

    return listPromise.then((response) => {
      entries.push(...response.entries);

      if (store.cloud.files.status === 'sync cancelled') {
        return Promise.reject(new Error('sync cancelled'));
      }

      return response.has_more
        ? getEntries({ list, entries, cursor: response.cursor })
        : entries;
    });
  };

  return getEntries({
    list: { path, recursive: true },
    entries: [],
  });
};

export default (store) => {
  const { key } = store.cloud;
  const dropbox = new Dropbox({ accessToken: key, fetch });
  const actions = {
    checkStatus,
    download,
    upload,
    removeUser,
    getStream,
    getFiles,
  };

  return Object.keys(actions).reduce(
    (actionsAuthed, key) => ({
      ...actionsAuthed,
      [key]: actions[key]({ dropbox, store }),
    }),
    {},
  );
};
