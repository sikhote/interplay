import { Observable } from 'rxjs/Observable';
import Dropbox from 'dropbox';

export const cloudGet = () => ({
  type: 'CLOUD_GET',
});

export const cloudGetSuccess = cloudState => ({
  type: 'CLOUD_GET_SUCCESS',
  payload: { cloudState },
});

const cloudGetEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_GET').mergeMap(() => {
    const state = getState();
    const settingsCloud = state.settings.cloud;
    const { key: accessToken, path, profile } = settingsCloud;
    const dropbox = new Dropbox({ accessToken });
    const getCloudState = Observable.from(
      Promise.all([
        dropbox.filesDownload({
          path: `/${path}/interplay/${profile}/other.json`,
        }),
        dropbox.filesDownload({
          path: `/${path}/interplay/${profile}/files.json`,
        }),
      ])
        .then(values =>
          Promise.all(
            values.map(
              ({ fileBlob }) =>
                new Promise(resolve => {
                  const reader = new FileReader();
                  reader.onload = event =>
                    resolve(JSON.parse(event.target.result));
                  reader.readAsText(fileBlob);
                }),
            ),
          ),
        )
        .then(values => Promise.resolve({ ...values[0], files: values[1] }))
        .catch(() => state),
    );

    return getCloudState.map(cloudState => cloudGetSuccess(cloudState));
  });

export const cloudSaveOther = () => ({
  type: 'CLOUD_SAVE_OTHER',
});

const cloudSaveOtherEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_SAVE_OTHER').mergeMap(() => {
    const { settings, cloud } = getState();
    const settingsCloud = settings.cloud;
    const { key: accessToken, path, profile } = settingsCloud;
    const dropbox = new Dropbox({ accessToken });
    const saveCloudState = Observable.from(
      dropbox.filesUpload({
        contents: JSON.stringify({ settings, cloud }),
        path: `/${path}/interplay/${profile}/other.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      }),
    );

    return saveCloudState.ignoreElements();
  });

export const cloudSaveFiles = () => ({
  type: 'CLOUD_SAVE_FILES',
});

const cloudSaveFilesEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_SAVE_FILES').mergeMap(() => {
    const { settings, files } = getState();
    const settingsCloud = settings.cloud;
    const { key: accessToken, path, profile } = settingsCloud;
    const dropbox = new Dropbox({ accessToken });
    const saveCloudState = Observable.from(
      dropbox.filesUpload({
        contents: JSON.stringify(files),
        path: `/${path}/interplay/${profile}/files.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      }),
    );

    return saveCloudState.ignoreElements();
  });

export const epics = [cloudGetEpic, cloudSaveOtherEpic, cloudSaveFilesEpic];
