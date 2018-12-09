import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Button, Select, Input } from 'antd';
import { at, difference } from 'lodash';
import IconButton from '../IconButton';
import Icon from '../Icon';
import H2 from '../H2';
import Spacer from '../Spacer';
import { playlistsRemove, playlistsUpdate } from '../../actions/playlists';
import { getSortedPlaylist, titleToSlug } from '../../lib/playlists';
import {
  modifiersSelectionsRemoveAll,
  modifiersShowUpdate,
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
      modifiersShow,
      modifiersShowUpdate,
      playlistsRemove,
      playlists,
      playlistsUpdate,
    } = this.props;
    const { selectedPlaylist, playlistName } = this.state;
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
    };
    const editPlaylistName = () => {
      const slug = titleToSlug(playlistName);
      const playlist = playlists.find(({ name }) => name === source);
      playlist.name = playlistName;
      playlistsUpdate(playlist);
      Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
    };

    return (
      <div className={`container ${modifiersShow ? 'show' : ''}`}>
        <style jsx>{styles}</style>
        {Boolean(modifiersSelections.length) && (
          <Button type="primary" onClick={() => modifiersSelectionsRemoveAll()}>
            Delect All
          </Button>
        )}
        {Boolean(modifiersSelections.length) && source === 'playlists' && (
          <Button type="primary" onClick={deletePlaylists}>
            Delete Playlist(s)
          </Button>
        )}
        {!['video', 'audio', 'playlists'].includes(source) && (
          <div>
            <H2>Edit name</H2>
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
        {Boolean(modifiersSelections.length) &&
          !['video', 'audio', 'playlists'].includes(source) && (
            <Button type="primary" onClick={deleteFromPlaylist}>
              Delete
            </Button>
          )}
        {Boolean(modifiersSelections.length) && source !== 'playlists' && (
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
  }),
)(Modifiers);
