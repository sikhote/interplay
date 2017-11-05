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
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });
    const getCloudState = Observable.from(
      dropbox
        .filesDownload({ path: `${path}/clairic.json` })
        .then(
          ({ fileBlob }) =>
            new Promise(resolve => {
              const reader = new FileReader();
              reader.onload = event => resolve(JSON.parse(event.target.result));
              reader.readAsText(fileBlob);
            }),
        )
        .catch(() => state),
    );

    return getCloudState.map(cloudState => cloudGetSuccess(cloudState));
  });

export const cloudSave = () => ({
  type: 'CLOUD_SAVE',
});

const cloudSaveEpic = (action$, { getState }) =>
  action$.ofType('CLOUD_SAVE').mergeMap(() => {
    const state = getState();
    const settingsCloud = state.settings.cloud;
    const accessToken = settingsCloud.key;
    const path = `/${settingsCloud.path}`;
    const dropbox = new Dropbox({ accessToken });
    const saveCloudState = Observable.from(
      dropbox.filesUpload({
        contents: JSON.stringify(state),
        path: `${path}/clairic.json`,
        mode: { '.tag': 'overwrite' },
        mute: true,
      }),
    );

    return saveCloudState.ignoreElements();
  });

export const epics = [cloudGetEpic, cloudSaveEpic];
