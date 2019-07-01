import Dropbox from 'dropbox';
import { merge, get, throttle } from 'lodash';
import notifier from '../lib/notifier';
import { appChange } from './app';
import { settingsReplaceLocal } from './settings';

export const cloudGet = () => (dispatch, getState) => {
  const {
    settings: {
      cloud: { key: accessToken, path, user },
    },
  } = getState();
  const dropbox = new Dropbox({ accessToken });

  return Promise.all([
    dropbox.filesGetMetadata({ path: `/${path}` }),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/other.json`,
      })
      .catch(() => Promise.resolve({})),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/files.json`,
      })
      .catch(() => Promise.resolve([])),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/playlists.json`,
      })
      .catch(() => Promise.resolve([])),
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
    .then(values =>
      Promise.resolve({
        ...values[1],
        files: values[2],
        playlists: values[3],
      }),
    )
    .then(cloudState => {
      const state = getState();
      const newState = merge(cloudState, {
        settings: {
          cloud: {
            key: get(state, 'settings.cloud.key') || '',
            path: get(state, 'settings.cloud.path') || '',
            user: get(state, 'settings.cloud.user') || '',
            isConnected: true,
          },
          player: {
            playing: false,
            loading: false,
          },
        },
      });

      dispatch(appChange(newState));
      notifier.success('Successfully downloaded from cloud');
    })
    .catch(() => {
      const { settings } = getState();
      const newSettings = {
        ...settings,
        cloud: {
          ...settings.cloud,
          isConnected: false,
        },
      };
      dispatch(settingsReplaceLocal(newSettings));
      notifier.error('Failed to download from cloud');
    });
};

const throttledCloudSaveOther = throttle(callback => callback(), 5000, {
  trailing: true,
});

export const cloudSaveOther = () => (dispatch, getState) =>
  throttledCloudSaveOther(() => {
    const { settings, cloud } = getState();
    const { key: accessToken, path, user } = settings.cloud;
    const dropbox = new Dropbox({ accessToken });

    return dropbox
      .filesUpload({
        contents: JSON.stringify({ settings, cloud }),
        path: `/${path}/interplay/${user}/other.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      })
      .catch(() => notifier.error('Failed to save to cloud'));
  });

export const cloudSaveFiles = () => (dispatch, getState) => {
  const {
    settings: {
      cloud: { key: accessToken, path, user },
    },
    files,
  } = getState();
  const dropbox = new Dropbox({ accessToken });

  return dropbox
    .filesUpload({
      contents: JSON.stringify(files),
      path: `/${path}/interplay/${user}/files.json`,
      mode: { '.tag': 'overwrite' },
      mute: true,
    })
    .then(() => notifier.success('Successfully saved to cloud'))
    .catch(() => notifier.error('Failed to save to cloud'));
};

const throttledCloudSavePlaylists = throttle(callback => callback(), 5000, {
  trailing: true,
});

export const cloudSavePlaylists = () => (dispatch, getState) =>
  throttledCloudSavePlaylists(() => {
    const {
      settings: {
        cloud: { key: accessToken, path, user },
      },
      playlists,
    } = getState();
    const dropbox = new Dropbox({ accessToken });

    dropbox
      .filesUpload({
        contents: JSON.stringify(playlists),
        path: `/${path}/interplay/${user}/playlists.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      })
      .catch(() => notifier.error('Failed to save to cloud'));
  });

export const cloudDelete = () => (dispatch, getState) => {
  const {
    settings: {
      cloud: { key: accessToken, path, user },
    },
  } = getState();
  const dropbox = new Dropbox({ accessToken });

  dropbox
    .filesDelete({ path: `/${path}/interplay/${user}` })
    .catch(() => notifier.error('Failed to delete from cloud'));
};
