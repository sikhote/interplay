const initialState = {
	hasCloudStore: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLOUD_GET_SUCCESS': {
			return { ...state, hasCloudStore: true };
		}
		default:
			return state;
	}
};

export default reducer;
