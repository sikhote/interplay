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
  } = getState();
  const dropbox = new Dropbox({ accessToken });

  return Promise.all([
    dropbox.filesDownload({
      path: `/${path}/interplay/${user}/other.json`,
    }),
    dropbox.filesDownload({
      path: `/${path}/interplay/${user}/files.json`,
    }),
  ])
    .then(values =>
      Promise.all(
        values.map(
          ({ fileBlob }) =>
            new Promise(resolve => {
              const reader = new FileReader();
              reader.onload = event => resolve(JSON.parse(event.target.result));
              reader.readAsText(fileBlob);
            }),
        ),
      ),
    )
    .then(values => Promise.resolve({ ...values[0], files: values[1] }))
    .then(cloudState => {
      dispatch(cloudGetSuccess(cloudState));
      notifier.success('Successfully downloaded from cloud');
    })
    .catch(() => notifier.error('Failed to download from cloud'));
};

const throttledCloudSaveOther = throttle(callback => callback(), 300000, {
  trailing: true,
});

export const cloudSaveOther = ({ settings, cloud }) => () =>
  throttledCloudSaveOther(() => {
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

export const cloudSaveFiles = files => (dispatch, getState) => {
  const {
    settings: {
      cloud: { key: accessToken, path, user },
    },
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
