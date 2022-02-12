import qs from 'query-string';
import { Dropbox } from 'dropbox';
import { startCase, get } from 'lodash';
import { getFileType } from 'lib/files';

const clientId = 'nvclnbz5hf59pep';

const getDbx = (auth) =>
  new Dropbox({
    accessToken: auth.data,
    ...(auth.members?.length > 0
      ? { selectUser: auth.members[auth.memberId]?.profile?.team_member_id }
      : {}),
  });

const isExpiredError = (error) =>
  error?.error?.error?.['.tag'] === 'expired_access_token';

const normalizeFolder = (folder) =>
  folder ? `/${folder.replace(/^\/|\/$/g, '')}` : '';

const requests = {
  upload: (state, payload) => {
    const { auth } = state;
    const { user } = auth;
    const { file, contents } = payload;
    const dbx = getDbx(auth);
    const folder = normalizeFolder(auth.folder);
    const path = `${folder}/interplay/${user || 'default'}${file}`;

    return dbx
      .filesUpload({
        contents: JSON.stringify(contents),
        path,
        mode: { '.tag': 'overwrite' },
        mute: true,
      })
      .catch((error) => {
        const isExpired = isExpiredError(error);
        const errorCode = isExpired ? 'access-token-expired' : 'unknown';
        const message = isExpired
          ? 'Access token expired.'
          : 'Could not download file';

        return Promise.reject({ errorCode, message });
      });
  },
  download: (state, payload) => {
    const { auth } = state;
    const { user } = auth;
    const dbx = getDbx(auth);
    const folder = normalizeFolder(auth.folder);
    const path = `${folder}/interplay/${user || 'default'}${payload}`;

    return dbx
      .filesDownload({ path })
      .then((response) => response.result.fileBlob.text())
      .then((text) => JSON.parse(text))
      .catch((error) => {
        const isExpired = isExpiredError(error);
        const errorCode = isExpired ? 'access-token-expired' : 'unknown';
        const message = isExpired
          ? 'Access token expired.'
          : 'Could not download file';
        return Promise.reject({ errorCode, message });
      });
  },
  syncFiles: (state) => {
    const { auth } = state;
    const dbx = getDbx(auth);
    const folder = normalizeFolder(auth.folder);
    const getExistingFile = (path) =>
      auth.files?.entries.find((file) => file.path === path);

    const getEntries = ({ cursor, list, entries }) => {
      const listPromise = cursor
        ? dbx.filesListFolderContinue({ cursor })
        : dbx.filesListFolder(list);

      return listPromise.then((response) => {
        const { result } = response;
        entries.push(...result.entries);

        return result.has_more
          ? getEntries({ list, entries, cursor: result.cursor })
          : entries;
      });
    };

    return getEntries({
      list: { path: folder, recursive: true },
      entries: [],
    }).then((entries) =>
      entries.reduce((files, entry) => {
        if (entry['.tag'] === 'file') {
          const filePath = entry.path_lower.replace(`${folder}/`, '');
          const parts = filePath.split('/').reverse();
          const fileNameParts = parts[0].split('.');
          const type = getFileType(fileNameParts.pop());
          let name = startCase(fileNameParts.join('.'));
          let track;

          if (!type) {
            return files;
          }

          if (type === 'audio' && /^\d{2}[" ]/.test(name)) {
            track = Number(name.slice(0, 2));
            name = name.slice(3);
          }

          const existingFile = getExistingFile(filePath);
          const dateAdded =
            existingFile && existingFile.dateAdded
              ? existingFile.dateAdded
              : Date.now();

          files.push({
            name,
            path: filePath,
            dateAdded,
            url: undefined,
            urlDate: undefined,
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
  },
  checkFolder: (state) => {
    const { auth } = state;
    const dbx = getDbx(auth);
    const folder = normalizeFolder(auth.folder);

    return dbx.filesListFolder({ path: folder }).catch((error) => {
      const isExpired = isExpiredError(error);
      const errorCode = isExpired ? 'access-token-expired' : 'unknown';
      const message = isExpired
        ? 'Access token expired.'
        : 'Failed to get folders.';

      return Promise.reject({ errorCode, message });
    });
  },
  attemptConnect: () => {
    const dbx = new Dropbox({ clientId });

    return dbx.auth
      .getAuthenticationUrl('http://localhost:3000')
      .then((authUrl) => {
        window.location = authUrl;
      });
  },
  checkMembers: (state) => {
    const { auth } = state;
    const dbx = new Dropbox({ accessToken: auth.data });

    return dbx
      .teamMembersList()
      .then((response) => response?.result?.members ?? [])
      .catch((error) => {
        const isExpired = isExpiredError(error);
        const errorCode = isExpired ? 'access-token-expired' : 'unknown';
        const message = isExpired
          ? 'Access token expired.'
          : 'Failed to get members.';

        return Promise.reject({ errorCode, message });
      });
  },
};

export default requests;
