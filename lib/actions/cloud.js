import { throttle } from 'lodash';
import packageJson from '../../package';
import portal from '../portal';

const { version } = packageJson;

export const cloudGet = ({ key: accessToken, path, user }) => {
  const dropbox = new Dropbox({ accessToken });
  const cloud = { status: 'connected' };
  const setStatusAndPassData = (key, downloaded, defaultData) => data => {
    Object.assign(cloud, {
      [key]: {
        status: downloaded ? 'synced' : 'not synced',
        date: Date.now(),
      },
    });
    return Promise.resolve(downloaded ? data : defaultData);
  };

  return Promise.all([
    portal(store).checkStatus()
    dropbox.filesGetMetadata({ path: `/${path}` }),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/other-${version}.json`,
      })
      .then(setStatusAndPassData('other', true))
      .catch(setStatusAndPassData('other', false, {})),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/files-${version}.json`,
      })
      .then(setStatusAndPassData('files', true))
      .catch(setStatusAndPassData('files', false, [])),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/playlists-${version}.json`,
      })
      .then(setStatusAndPassData('playlists', true))
      .catch(setStatusAndPassData('playlists', false, [])),
  ])
    .then(values =>
      Promise.all(
        values.map(
          data =>
            new Promise(resolve => {
              if (!data || !data.fileBlob) {
                resolve(data);
                return;
              }

              const reader = new FileReader();
              reader.addEventListener('load', event =>
                resolve(JSON.parse(event.target.result)),
              );
              reader.readAsText(data.fileBlob);
            }),
        ),
      ),
    )
    .then(values => {
      const { modifiers, player, lists } = values[1];
      return Promise.resolve({
        cloud,
        modifiers,
        player,
        lists,
        files: values[2],
        playlists: values[3],
      });
    });
};

const throttledCloudSaveOther = throttle(callback => callback(), 5000, {
  trailing: true,
});

export const cloudSaveOther = ({
  store: { modifiers, cloud, player, lists },
}) =>
  throttledCloudSaveOther(() => {
    const { key: accessToken, path, user } = cloud;
    const dropbox = new Dropbox({ accessToken });

    return dropbox.filesUpload({
      contents: JSON.stringify({ modifiers, cloud, player, lists }),
      path: `/${path}/interplay/${user}/other-${version}.json`,
      mode: { '.tag': 'overwrite' },
      mute: true,
    });
  });

export const cloudSaveFiles = ({
  files,
  cloud: { key: accessToken, path, user },
}) => {
  const dropbox = new Dropbox({ accessToken });

  return dropbox.filesUpload({
    contents: JSON.stringify(files),
    path: `/${path}/interplay/${user}/files-${version}.json`,
    mode: { '.tag': 'overwrite' },
    mute: true,
  });
};

const throttledCloudSavePlaylists = throttle(callback => callback(), 5000, {
  trailing: true,
});

export const cloudSavePlaylists = ({
  store: {
    cloud: { key: accessToken, path, user },
    playlists,
  },
}) =>
  throttledCloudSavePlaylists(() => {
    const dropbox = new Dropbox({ accessToken });

    dropbox.filesUpload({
      contents: JSON.stringify(playlists),
      path: `/${path}/interplay/${user}/playlists-${version}.json`,
      mode: { '.tag': 'overwrite' },
      mute: true,
    });
  });

export const cloudDelete = ({
  store: {
    cloud: { key: accessToken, path, user },
  },
}) => {
  const dropbox = new Dropbox({ accessToken });

  return dropbox.filesDelete({ path: `/${path}/interplay/${user}` });
};
