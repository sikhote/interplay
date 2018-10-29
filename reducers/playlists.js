const initialState = [
	{
		created: Date.now(),
		updated: Date.now(),
		name: 'Gimme More',
		tracks: [],
	},
	{
		created: 1529470943807,
		updated: 1529470943807,
		name: 'Buy Me Tacos',
		tracks: [],
	},
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PLAYLISTS_UPDATE': {
			const newState = state.slice();
			const { playlist } = action.payload;
			const index = newState.findIndex(({ id }) => id === playlist.id);
			newState[index] = playlist;
			return newState;
		}
		case 'PLAYLISTS_ADD': {
			const newState = state.slice();
			const { playlist } = action.payload;
			newState.push(playlist);
			return newState;
		}
		case 'PLAYLISTS_REMOVE': {
			const newState = state.slice();
			const { playlist } = action.payload;
			const index = newState.findIndex(({ id }) => id === playlist.id);
			newState.splice(index, 1);
			return newState;
		}
		default:
			return state;
	}
};

export default reducer;
