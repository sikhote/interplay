import { merge, get, set } from 'lodash';
import getInitialState from './get-initial-state';
import { getNewPlaylist } from './playlists';

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
      addUnsavedChange(newState, 'other');
      return newState;
    }

    case 'modifiers-selections-reset': {
      newState.modifiers.selections = getInitialState().modifiers.selections;
      addUnsavedChange(newState, 'other');
      return newState;
    }

    case 'modifiers-show-update': {
      newState.modifiers.show = action.payload;
      addUnsavedChange(newState, 'other');
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

    default:
      throw new Error('Action not supported');
  }
};
