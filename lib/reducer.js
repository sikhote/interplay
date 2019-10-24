import { merge, get } from 'lodash';
import getInitialState from './get-initial-state';
import { getNewPlaylist } from './playlists';

export default (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'store-update': {
      return merge({}, newState, action.payload, {
        cloud: {
          key: get(state, 'cloud.key') || '',
          path: get(state, 'cloud.path') || '',
          user: get(state, 'cloud.user') || '',
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

    case 'modifiers-selections-toggle': {
      let newSelections;

      if (newState.modifiers.selections.includes(action.payload)) {
        newSelections = newState.modifiers.selections.slice();
        const index = newSelections.findIndex(path => path === action.payload);
        newSelections.splice(index, 1);
      } else {
        newSelections = newState.modifiers.selections.concat(action.payload);
      }

      newState.modifiers.selections = newSelections;

      return newState;
    }

    case 'modifiers-selections-reset': {
      newState.modifiers.selections = getInitialState().modifiers.selections;
      return newState;
    }

    case 'modifiers-show-update': {
      newState.modifiers.show = action.payload;
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
      newState.playlists = newState.playlists.concat(
        getNewPlaylist(newState.playlists),
      );
      return newState;
    }

    case 'playlists-remove': {
      newState.playlists = newState.playlists.filter(
        ({ name }) => !action.payload.includes(name),
      );
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
