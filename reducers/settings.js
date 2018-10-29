import Cookies from 'js-cookie';

const hasCookies = typeof window !== 'undefined';

export const getInitialState = () => ({
	cloud: {
		key: (hasCookies && Cookies.get('key')) || '',
		path: (hasCookies && Cookies.get('path')) || '',
		user: (hasCookies && Cookies.get('user')) || 'default',
		date: undefined,
		status: undefined,
	},
	player: {
		source: 'audio',
		volume: 0.1,
		muted: false,
		playing: false,
		loop: false,
		random: false,
		file: {},
		played: 0,
		playedSeconds: 0,
	},
	// Stores position, sortBy, sortDirection, search for each list
	lists: {},
});

const reducer = (state = getInitialState(), action) => {
	switch (action.type) {
		case 'SETTINGS_REPLACE': {
			const { settings } = action.payload;
			return settings || state;
		}
		default:
			return state;
	}
};

export default reducer;
