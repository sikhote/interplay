import { merge, get } from 'lodash';
import getInitialState from './get-initial-state';
import { getNewPlaylist } from './playlists';

export default (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'store-get': {
      return newState;
    }

    case 'store-replace': {
      return merge(action.payload, {
        cloud: {
          key: get(newState, 'cloud.key') || '',
          path: get(newState, 'cloud.path') || '',
          user: get(newState, 'cloud.user') || '',
          isConnected: true,
        },
        player: {
          playing: false,
          loading: false,
        },
      });
    }

    case 'files-update': {
      const {
        file: { path, url, urlDate },
      } = action.payload;
      const file = newState.files.find(file => file.path === path);
      Object.assign(file, { url, urlDate });
      return newState;
    }

    case 'files-replace': {
      newState.files = action.payload;
      return newState;
    }

    case 'modifiders-selections-toggle': {
      let selections;

      if (newState.modifiders.selections.includes(action.payload)) {
        selections = newState.modifiders.selections.slice();
        const index = selections.modifiders.findIndex(
          path => path === action.payload,
        );
        selections.splice(index, 1);
      } else {
        selections = state.modifiders.selections.concat(action.payload);
      }

      return newState;
    }

    case 'modifiders-selections-reset': {
      newState.modifiders.selections = getInitialState().modifiers.selections;
      return newState;
    }

    case 'modifiders-show-update': {
      newState.modifiders.show = action.payload;
      return newState;
    }

    case 'playlists-update': {
      const newState = state.slice();
      const index = newState.findIndex(
        ({ name }) => name === action.payload.name,
      );
      newState[index] = action.payload;
      return newState;
    }

    case 'playlists-add': {
      newState.playlists.concat(getNewPlaylist(newState.playlists));
      return newState;
    }

    case 'playlists-remove': {
      newState.playlists = newState.playlists.filter(
        ({ name }) => !action.payload.includes(name),
      );
      return newState;
    }

    case 'cloud-update': {
      newState.cloud[action.payload[0]] = action.payload[1];
      return newState;
    }

    case 'cloud-update-many': {
      Object.assign(newState.cloud, action.payload);
      return newState;
    }

    case 'player-update': {
      newState.player[action.payload[0]] = action.payload[1];
      return newState;
    }

    case 'player-update-many': {
      Object.assign(newState.player, action.payload);
      return newState;
    }

    case 'lists-update': {
      newState.lists[action.payload[0]] = action.payload[1];
      return newState;
    }

    default:
      throw new Error('Action not supported');
  }
};
