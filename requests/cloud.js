import Dropbox from 'dropbox';
import { throttle, merge } from 'lodash';
import notifier from '../lib/notifier';
import packageJson from '../package';

const { version } = packageJson;

export const cloudGet = ({
  dispatch,
  store: {
    cloud: { key: accessToken, path, user },
  },
}) => {
  const dropbox = new Dropbox({ accessToken });
  const cloud = { status: 'tried' };
  const setStatusAndPassData = (key, downloaded, defaultData) => data => {
    Object.assign(cloud, {
      [key]: {
        status: downloaded ? 'downloaded' : 'failed',
        date: Date.now(),
      },
    });
    return Promise.resolve(downloaded ? data : defaultData);
  };

  return Promise.all([
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
    .then(values =>
      Promise.resolve(
        merge(
          {
            ...values[1],
            files: values[2],
            playlists: values[3],
          },
          { cloud },
        ),
      ),
    )
    .then(cloudState => {
      dispatch({ type: 'store-replace', payload: cloudState });
      notifier.success('Successfully downloaded from cloud');
    })
    .catch(() => {
      dispatch({ type: 'cloud-update', payload: ['status', 'tried'] });
      notifier.error('Failed to download from cloud');
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

    return dropbox
      .filesUpload({
        contents: JSON.stringify({ modifiers, cloud, player, lists }),
        path: `/${path}/interplay/${user}/other-${version}.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      })
      .catch(() => notifier.error('Failed to save to cloud'));
  });

export const cloudSaveFiles = ({
  store: {
    files,
    cloud: { key: accessToken, path, user },
  },
}) => {
  const dropbox = new Dropbox({ accessToken });

  return dropbox
    .filesUpload({
      contents: JSON.stringify(files),
      path: `/${path}/interplay/${user}/files-${version}.json`,
      mode: { '.tag': 'overwrite' },
      mute: true,
    })
    .then(() => notifier.success('Successfully saved to cloud'))
    .catch(() => notifier.error('Failed to save to cloud'));
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

    dropbox
      .filesUpload({
        contents: JSON.stringify(playlists),
        path: `/${path}/interplay/${user}/playlists-${version}.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      })
      .catch(() => notifier.error('Failed to save to cloud'));
  });

export const cloudDelete = ({
  store: {
    cloud: { key: accessToken, path, user },
  },
}) => {
  const dropbox = new Dropbox({ accessToken });

  dropbox
    .filesDelete({ path: `/${path}/interplay/${user}` })
    .catch(() => notifier.error('Failed to delete from cloud'));
};
