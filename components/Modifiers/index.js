import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Button, Select, Input } from 'antd';
import { at, difference } from 'lodash';
import arrayMove from 'array-move';
import IconButton from '../IconButton';
import Icon from '../Icon';
import H2 from '../H2';
import Spacer from '../Spacer';
import { playlistsRemove, playlistsUpdate } from '../../actions/playlists';
import { getSortedPlaylist, titleToSlug } from '../../lib/playlists';
import {
  modifiersSelectionsRemoveAll,
  modifiersShowUpdate,
  modifiersSelectionsToggle,
} from '../../actions/modifiers';
import { spacing } from '../../lib/styling';
import styles from './styles';

class Modifiers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: undefined,
      playlistName: undefined,
    };
  }

  render() {
    const {
      source,
      settings,
      files,
      modifiersSelections,
      modifiersSelectionsRemoveAll,
      modifiersSelectionsToggle,
      modifiersShow,
      modifiersShowUpdate,
      playlistsRemove,
      playlists,
      playlistsUpdate,
    } = this.props;
    const { selectedPlaylist, playlistName } = this.state;
    const hasSelections = Boolean(modifiersSelections.length);
    const deletePlaylists = () => {
      playlistsRemove(modifiersSelections);
      modifiersSelectionsRemoveAll();
      modifiersShowUpdate(false);
    };
    const addToPlaylist = () => {
      const playlist = playlists.find(({ name }) => name === selectedPlaylist);
      let tracksToAdd;

      if (['video', 'audio'].includes(source)) {
        tracksToAdd = modifiersSelections;
      } else {
        const currentPlaylist = playlists.find(({ name }) => name === source);
        tracksToAdd = at(currentPlaylist.tracks, modifiersSelections);
      }

      playlist.tracks = playlist.tracks.concat(tracksToAdd);
      playlistsUpdate(playlist);
    };
    const deleteFromPlaylist = () => {
      const playlist = playlists.find(({ name }) => name === source);
      const tracksToDelete = at(
        getSortedPlaylist({ settings, source, files, playlists }),
        modifiersSelections,
      );
      playlist.tracks = difference(playlist.tracks, tracksToDelete);
      playlistsUpdate(playlist);
      modifiersSelectionsRemoveAll();
    };
    const editPlaylistName = () => {
      const slug = titleToSlug(playlistName);
      const playlist = playlists.find(({ name }) => name === source);
      playlist.name = playlistName;
      playlistsUpdate(playlist);
      Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
    };
    const moveTracks = isMovingUp => {
      const playlist = playlists.find(({ name }) => name === source);
      let newTracks = playlist.tracks.slice();

      // Get selections in sequence, but reverse depending on direction
      const sortedSelections = isMovingUp
        ? modifiersSelections.slice().sort()
        : modifiersSelections
            .slice()
            .sort()
            .reverse();

      // Find paths based on indexes
      const paths = sortedSelections.map(i => playlist.tracks[i]);

      // Move each track individually
      paths.forEach(path => {
        const index = newTracks.findIndex(p => p === path);
        const newIndex = index + (isMovingUp ? -1 : 1);
        newTracks = arrayMove(
          newTracks,
          index,
          newIndex === newTracks.length ? 0 : newIndex,
        );
      });

      // Save tracks
      playlist.tracks = newTracks;
      playlistsUpdate(playlist);

      // Reset selections to new indexes
      modifiersSelectionsRemoveAll();
      const newSelections = paths.map(path =>
        newTracks.findIndex(p => p === path),
      );
      newSelections.forEach(index => modifiersSelectionsToggle(index));
    };

    return (
      <div className={`container ${modifiersShow ? 'show' : ''}`}>
        <style jsx>{styles}</style>
        {hasSelections && (
          <Button type="primary" onClick={modifiersSelectionsRemoveAll}>
            Delect All
          </Button>
        )}
        {hasSelections && source === 'playlists' && (
          <Button type="primary" onClick={deletePlaylists}>
            Delete Playlist(s)
          </Button>
        )}
        {!['video', 'audio', 'playlists'].includes(source) && (
          <div>
            <H2>Edit playlist name</H2>
            <Spacer height={spacing.a2} />
            <div className="name">
              <Input
                placeholder="Name"
                value={playlistName === undefined ? source : playlistName}
                onChange={e => this.setState({ playlistName: e.target.value })}
              />
              <IconButton onClick={() => editPlaylistName()}>
                <Icon icon="check" />
              </IconButton>
            </div>
          </div>
        )}
        {hasSelections && !['video', 'audio', 'playlists'].includes(source) && (
          <div className="moving">
            <Button type="primary" onClick={() => moveTracks(true)}>
              Move Up
            </Button>
            <Button type="primary" onClick={() => moveTracks(false)}>
              Move Down
            </Button>
          </div>
        )}
        {hasSelections && !['video', 'audio', 'playlists'].includes(source) && (
          <Button type="primary" onClick={deleteFromPlaylist}>
            Delete
          </Button>
        )}
        {hasSelections && source !== 'playlists' && (
          <div>
            <H2>Add to playlist</H2>
            <Spacer height={spacing.a2} />
            <div className="playlists">
              <Select
                value={selectedPlaylist}
                onChange={value => this.setState({ selectedPlaylist: value })}
              >
                {playlists.map(({ name }) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
              <IconButton
                disabled={selectedPlaylist === undefined}
                onClick={addToPlaylist}
              >
                <Icon icon="plus" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Modifiers.propTypes = {
  source: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  playlistsRemove: PropTypes.func.isRequired,
  playlistsUpdate: PropTypes.func.isRequired,
  modifiersShow: PropTypes.bool.isRequired,
  modifiersSelections: PropTypes.array.isRequired,
  modifiersSelectionsRemoveAll: PropTypes.func.isRequired,
  modifiersSelectionsToggle: PropTypes.func.isRequired,
  modifiersShowUpdate: PropTypes.func.isRequired,
};

export default connect(
  ({ modifiers, playlists, files, settings }) => ({
    files,
    settings,
    playlists,
    modifiersShow: modifiers.show,
    modifiersSelections: modifiers.selections,
  }),
  dispatch => ({
    playlistsRemove: payload => dispatch(playlistsRemove(payload)),
    playlistsUpdate: payload => dispatch(playlistsUpdate(payload)),
    modifiersSelectionsRemoveAll: () =>
      dispatch(modifiersSelectionsRemoveAll()),
    modifiersShowUpdate: payload => dispatch(modifiersShowUpdate(payload)),
    modifiersSelectionsToggle: payload =>
      dispatch(modifiersSelectionsToggle(payload)),
  }),
)(Modifiers);
