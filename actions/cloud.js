import Dropbox from 'dropbox';
import { message as notifier } from 'antd';
import { throttle } from 'lodash';

export const cloudGetSuccess = cloudState => ({
  type: 'CLOUD_GET_SUCCESS',
  payload: { cloudState },
});

export const cloudGet = () => (dispatch, getState) => {
  const {
    settings: {
      cloud: { key: accessToken, path, user },
    },
    files,
    playlists,
  } = getState();
  const dropbox = new Dropbox({ accessToken });

  return Promise.all([
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/other.json`,
      })
      .catch(() => Promise.resolve({})),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/files.json`,
      })
      .catch(() => Promise.resolve({})),
    dropbox
      .filesDownload({
        path: `/${path}/interplay/${user}/playlists.json`,
      })
      .catch(() => Promise.resolve({})),
  ])
    .then(values =>
      Promise.all(
        values.map(
          data =>
            new Promise(resolve => {
              if (!data.fileBlob) {
                resolve(data);
                return;
              }

              const reader = new FileReader();
              reader.onload = event => resolve(JSON.parse(event.target.result));
              reader.readAsText(data.fileBlob);
            }),
        ),
      ),
    )
    .then(values =>
      Promise.resolve({
        ...values[0],
        files: { ...files, ...values[1] },
        playlists: { ...playlists, ...values[2] },
      }),
    )
    .then(cloudState => {
      dispatch(cloudGetSuccess(cloudState));
      notifier.success('Successfully downloaded from cloud');
    })
    .catch(e => {
      console.log(e);
      notifier.error('Failed to download from cloud');
    });
};

const throttledCloudSaveOther = throttle(callback => callback(), 300000, {
  trailing: true,
});

export const cloudSaveOther = () => (dispatch, getState) =>
  throttledCloudSaveOther(() => {
    const { settings, cloud } = getState();
    const { key: accessToken, path, user } = settings.cloud;
    const dropbox = new Dropbox({ accessToken });

    dropbox
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

const throttledCloudSavePlaylists = throttle(callback => callback(), 60000, {
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
