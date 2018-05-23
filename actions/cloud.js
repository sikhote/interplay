import Dropbox from 'dropbox';
import { message as notifier } from 'antd';

export const cloudGetSuccess = cloudState => ({
  type: 'CLOUD_GET_SUCCESS',
  payload: { cloudState },
});

export const cloudGet = () => (dispatch, getState) => {
  const { settings: { cloud: { key: accessToken, path, user } } } = getState();
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

export const cloudSaveOther = () => (dispatch, getState) => {
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
};

export const cloudSaveFiles = () => (dispatch, getState) => {
  const {
    settings: { cloud: { key: accessToken, path, user } },
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
