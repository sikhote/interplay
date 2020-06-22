import { merge, get, set } from 'lodash';
import { getNewPlaylist } from './playlists';
import getInitialState from './get-initial-state';

export default (state, action) => {
  const newState = { ...state };
  const addUnsavedChange = (someState, type) => {
    const current = get(someState, `cloud[${type}]changes`) || 0;
    set(someState, `cloud[${type}]changes`, current + 1);
  };

  switch (action.type) {
    case 'store-update': {
      return merge({}, newState, action.payload, {
        cloud: {
          key: get(state, 'cloud.key') || '',
          path: get(state, 'cloud.path') || '',
          user: get(state, 'cloud.user') || '',
          playlists: {
            changes: 0,
          },
          other: {
            changes: 0,
          },
        },
        player: {
          playing: false,
          loading: false,
        },
      });
    }

    case 'cloud-update': {
      newState.cloud[action.payload[0]] = action.payload[1];
      return newState;
    }

    case 'cloud-update-many': {
      Object.assign(newState.cloud, action.payload);
      return newState;
    }

    case 'files-update': {
      const { path } = action.payload;
      const file = newState.files.find((file) => file.path === path);
      Object.assign(file, action.payload);
      return newState;
    }

    case 'files-replace': {
      newState.files = action.payload;
      return newState;
    }

    case 'options-start': {
      const [key, value, context = {}] = action.payload;
      newState.options = { ...newState.options, key, value, context };
      return newState;
    }

    case 'options-reset': {
      newState.options = getInitialState().options;
      return newState;
    }

    case 'playlists-update': {
      newState.playlists = newState.playlists.slice();
      const index = newState.playlists.findIndex(
        ({ name }) => name === action.payload.name,
      );
      newState.playlists[index] = action.payload;
      addUnsavedChange(newState, 'playlists');
      return newState;
    }

    case 'playlists-add': {
      newState.playlists = newState.playlists.concat(
        getNewPlaylist(newState.playlists),
      );
      addUnsavedChange(newState, 'playlists');
      return newState;
    }

    case 'playlists-remove': {
      newState.playlists = newState.playlists.filter(
        ({ name }) => !action.payload.includes(name),
      );
      addUnsavedChange(newState, 'playlists');
      return newState;
    }

    case 'player-update': {
      newState.player[action.payload[0]] = action.payload[1];
      addUnsavedChange(newState, 'other');
      return newState;
    }

    case 'player-update-many': {
      Object.assign(newState.player, action.payload);
      addUnsavedChange(newState, 'other');
      return newState;
    }

    case 'lists-update': {
      newState.lists[action.payload[0]] = action.payload[1];
      addUnsavedChange(newState, 'other');
      return newState;
    }

    case 'notifications-add': {
      newState.notifications = newState.notifications.concat([action.payload]);
      return newState;
    }

    case 'notifications-remove': {
      newState.notifications = newState.notifications.filter(
        ({ id }) => !action.payload.includes(id),
      );
      return newState;
    }

    case 'reset': {
      const { type, key, path, user } = state.cloud;
      const newStore = getInitialState();
      newStore.cloud = { ...newStore.cloud, type, key, path, user };
      return getInitialState();
    }

    default:
      throw new Error('Action not supported');
  }
};
