import { cloudSaveOther } from '../actions/cloud';

export const settingsReplace = settings => dispatch => {
  dispatch({
    type: 'SETTINGS_REPLACE',
    payload: { settings },
  });
  dispatch(cloudSaveOther());
};
