import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Button, Select, Input } from 'antd';
import { at, get } from 'lodash';
import arrayMove from 'array-move';
import IconButton from '../IconButton';
import Icon from '../Icon';
import H2 from '../H2';
import Spacer from '../Spacer';
import { playlistsRemove, playlistsUpdate } from '../../actions/playlists';
import { titleToSlug } from '../../lib/playlists';
import {
  modifiersSelectionsRemoveAll,
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
      modifiersSelections,
      modifiersSelectionsRemoveAll,
      modifiersSelectionsToggle,
      modifiersShow,
      playlistsRemove,
      playlists,
      playlistsUpdate,
      files,
    } = this.props;
    const { selectedPlaylist, playlistName } = this.state;
    const hasSelections = Boolean(modifiersSelections.length);
    const currentPlaylist = playlists.find(({ name }) => name === source);
    const deletePlaylists = () => {
      const deletingCurrent = !['video', 'audio', 'playlists'].includes(source);
      const playlistsToRemove = deletingCurrent
        ? [source]
        : modifiersSelections;

      playlistsRemove(playlistsToRemove);
      modifiersSelectionsRemoveAll();

      if (deletingCurrent) {
        Router.push('/playlists');
      }
    };
    const addToPlaylist = () => {
      const playlist = playlists.find(({ name }) => name === selectedPlaylist);
      const tracksToAdd = ['video', 'audio'].includes(source)
        ? modifiersSelections
        : at(currentPlaylist.tracks, modifiersSelections);

      playlist.tracks = playlist.tracks.concat(tracksToAdd);
      playlistsUpdate(playlist);
      modifiersSelectionsRemoveAll();
    };
    const deleteFromPlaylist = () => {
      const playlist = playlists.find(({ name }) => name === source);
      const newTracks = playlist.tracks.slice();
      const paths = modifiersSelections.map(i => playlist.tracks[i]);

      paths.forEach(path => {
        const deleteIndex = newTracks.findIndex(track => track === path);
        newTracks.splice(deleteIndex, 1);
      });

      playlist.tracks = newTracks;
      playlistsUpdate(playlist);
      modifiersSelectionsRemoveAll();
    };
    const editPlaylistName = () => {
      const slug = titleToSlug(playlistName);
      currentPlaylist.name = playlistName;
      playlistsUpdate(currentPlaylist);
      Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
    };
    const moveTracks = isMovingUp => {
      let newTracks = currentPlaylist.tracks.slice();

      // Get selections in sequence, but reverse depending on direction
      const sortedSelections = isMovingUp
        ? modifiersSelections.slice().sort()
        : modifiersSelections
            .slice()
            .sort()
            .reverse();

      // Find paths based on indexes
      const paths = sortedSelections.map(i => currentPlaylist.tracks[i]);

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
      currentPlaylist.tracks = newTracks;
      playlistsUpdate(currentPlaylist);

      // Reset selections to new indexes
      modifiersSelectionsRemoveAll();
      const newSelections = paths.map(path =>
        newTracks.findIndex(p => p === path),
      );
      newSelections.forEach(index => modifiersSelectionsToggle(index));
    };
    const selections =
      source === 'playlists'
        ? modifiersSelections.map(name => ({
            key: name,
            name,
          }))
        : ['video', 'audio'].includes(source)
        ? modifiersSelections.map(path => ({
            key: path,
            name: get(files.find(file => file.path === path), 'name', ''),
          }))
        : modifiersSelections.map(index => ({
            key: index,
            name: get(
              files.find(file => file.path === currentPlaylist.tracks[index]),
              'name',
              '',
            ),
          }));

    return (
      <div className={`container ${modifiersShow ? 'show' : ''}`}>
        <style jsx>{styles}</style>
        <div className="selections">
          {selections.map(({ name, key }) => (
            <div key={key}>{name}</div>
          ))}
        </div>
        <div className="options-container">
          <div className="options">
            {hasSelections && (
              <Button type="primary" onClick={modifiersSelectionsRemoveAll}>
                Delect All
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
                    onChange={e =>
                      this.setState({ playlistName: e.target.value })
                    }
                  />
                  <IconButton onClick={() => editPlaylistName()}>
                    <Icon icon="check" />
                  </IconButton>
                </div>
              </div>
            )}
            {hasSelections &&
              !['video', 'audio', 'playlists'].includes(source) && (
                <div className="moving">
                  <Button type="primary" onClick={() => moveTracks(true)}>
                    Move Up
                  </Button>
                  <Button type="primary" onClick={() => moveTracks(false)}>
                    Move Down
                  </Button>
                </div>
              )}
            {hasSelections && source !== 'playlists' && (
              <div>
                <H2>Add to playlist</H2>
                <Spacer height={spacing.a2} />
                <div className="playlists">
                  <Select
                    value={selectedPlaylist}
                    onChange={value =>
                      this.setState({ selectedPlaylist: value })
                    }
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
            {hasSelections &&
              !['video', 'audio', 'playlists'].includes(source) && (
                <Button type="primary" onClick={deleteFromPlaylist}>
                  Delete
                </Button>
              )}
            {hasSelections && source === 'playlists' && (
              <Button type="primary" onClick={deletePlaylists}>
                Delete Playlist(s)
              </Button>
            )}
            {!['video', 'audio', 'playlists'].includes(source) && (
              <Button type="primary" onClick={deletePlaylists}>
                Delete Playlist
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modifiers.propTypes = {
  source: PropTypes.string.isRequired,
  playlists: PropTypes.array.isRequired,
  playlistsRemove: PropTypes.func.isRequired,
  playlistsUpdate: PropTypes.func.isRequired,
  modifiersShow: PropTypes.bool.isRequired,
  modifiersSelections: PropTypes.array.isRequired,
  modifiersSelectionsRemoveAll: PropTypes.func.isRequired,
  modifiersSelectionsToggle: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
};

export default connect(
  ({ modifiers, playlists, files }) => ({
    playlists,
    modifiersShow: modifiers.show,
    modifiersSelections: modifiers.selections,
    files,
  }),
  dispatch => ({
    playlistsRemove: payload => dispatch(playlistsRemove(payload)),
    playlistsUpdate: payload => dispatch(playlistsUpdate(payload)),
    modifiersSelectionsRemoveAll: () =>
      dispatch(modifiersSelectionsRemoveAll()),
    modifiersSelectionsToggle: payload =>
      dispatch(modifiersSelectionsToggle(payload)),
  }),
)(Modifiers);
