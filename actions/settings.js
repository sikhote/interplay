import { cloudSaveOther } from './cloud';

export const settingsReplace = payload => dispatch => {
	dispatch({
		type: 'SETTINGS_REPLACE',
		payload,
	});
	dispatch(cloudSaveOther());
};

export const settingsReplaceLocal = payload => ({
	type: 'SETTINGS_REPLACE',
	payload,
});
