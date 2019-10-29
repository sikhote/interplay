import { throttle } from 'lodash';
import packageJson from '../../package';
import getPortal from '../get-portal';

const { version } = packageJson;

export const cloudGet = store => {
  const { path, user } = store.cloud;
  const portal = getPortal(store);
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
    portal.checkStatus(),
    portal
      .download(`/${path}/interplay/${user}/other-${version}.json`)
      .then(setStatusAndPassData('other', true))
      .catch(setStatusAndPassData('other', false, {})),
    portal
      .download(`/${path}/interplay/${user}/files-${version}.json`)
      .then(setStatusAndPassData('files', true))
      .catch(setStatusAndPassData('files', false, [])),
    portal
      .download(`/${path}/interplay/${user}/playlists-${version}.json`)
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

export const cloudSaveOther = store => {
  const { modifiers, cloud, player, lists } = store;
  const { path, user } = cloud;
  const portal = getPortal(store);

  return throttledCloudSaveOther(() =>
    portal.upload({
      contents: JSON.stringify({ modifiers, cloud, player, lists }),
      path: `/${path}/interplay/${user}/other-${version}.json`,
    }),
  );
};

export const cloudSaveFiles = store => {
  const {
    files,
    cloud: { path, user },
  } = store;

  return getPortal(store).upload({
    contents: JSON.stringify(files),
    path: `/${path}/interplay/${user}/files-${version}.json`,
  });
};

const throttledCloudSavePlaylists = throttle(callback => callback(), 5000, {
  trailing: true,
});

export const cloudSavePlaylists = store => {
  const {
    cloud: { path, user },
    playlists,
  } = store;
  const portal = getPortal(store);

  return throttledCloudSavePlaylists(() =>
    portal.upload({
      contents: JSON.stringify(playlists),
      path: `/${path}/interplay/${user}/playlists-${version}.json`,
    }),
  );
};

export const cloudDelete = store => getPortal(store).removeUser();
