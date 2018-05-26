import { cloudSaveOther } from '../actions/cloud';

export const settingsReplace = settings => (dispatch, getState) => {
  const { cloud } = getState();

  dispatch({
    type: 'SETTINGS_REPLACE',
    payload: { settings },
  });
  dispatch(cloudSaveOther({ settings, cloud }));
};
