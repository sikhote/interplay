import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { at, get, merge } from 'lodash';
import arrayMove from 'array-move';
import Button from '../Button';
import Select from '../Select';
import Text from '../Text';
import Input from '../Input';
import H2 from '../H2';
import { titleToSlug } from '../../lib/playlists';
import styles from './styles';

const Modifiers = ({
  source,
  dispatch,
  store: { modifiers, playlists, files },
}) => {
  const [selectedPlaylist, selectedPlaylistSet] = useState(undefined);
  const [playlistName, playlistNameSet] = useState(undefined);
  const hasSelections = Boolean(modifiers.selections.length);
  const currentPlaylist = playlists.find(({ name }) => name === source);
  const deletePlaylists = () => {
    const deletingCurrent = !['video', 'audio', 'playlists'].includes(source);
    const playlistsToRemove = deletingCurrent ? [source] : modifiers.selections;

    dispatch({ type: 'playlists-remove', payload: playlistsToRemove });
    dispatch({ type: 'modifiers-selections-reset' });

    if (deletingCurrent) {
      Router.push('/playlists');
    }
  };

  const addToPlaylist = () => {
    const playlist = playlists.find(({ name }) => name === selectedPlaylist);
    const tracksToAdd = ['video', 'audio'].includes(source)
      ? modifiers.selections
      : at(currentPlaylist.tracks, modifiers.selections);

    playlist.tracks = playlist.tracks.concat(tracksToAdd);
    dispatch({ type: 'playlists-update', payload: playlist });
    dispatch({ type: 'modifiers-selections-reset' });
  };

  const deleteFromPlaylist = () => {
    const playlist = playlists.find(({ name }) => name === source);
    const newTracks = playlist.tracks.slice();
    const paths = modifiers.selections.map(i => playlist.tracks[i]);

    paths.forEach(path => {
      const deleteIndex = newTracks.findIndex(track => track === path);
      newTracks.splice(deleteIndex, 1);
    });

    playlist.tracks = newTracks;
    dispatch({ type: 'playlists-update', payload: playlist });
    dispatch({ type: 'modifiers-selections-reset' });
  };

  const editPlaylistName = () => {
    const slug = titleToSlug(playlistName);
    currentPlaylist.name = playlistName;
    dispatch({ type: 'playlists-update', payload: currentPlaylist });
    Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
  };

  const moveTracks = isMovingUp => {
    let newTracks = currentPlaylist.tracks.slice();

    // Get selections in sequence, but reverse depending on direction
    const sortedSelections = isMovingUp
      ? modifiers.selections.slice().sort()
      : modifiers.selections
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
    dispatch({ type: 'playlists-update', payload: currentPlaylist });

    // Reset selections to new indexes
    dispatch({ type: 'modifiers-selections-reset' });

    const newSelections = paths.map(path =>
      newTracks.findIndex(p => p === path),
    );
    newSelections.forEach(index =>
      dispatch({ type: 'modifiers-selections-toggle', payload: index }),
    );
  };

  const selections =
    source === 'playlists'
      ? modifiers.selections.map(name => ({
          key: name,
          name,
        }))
      : ['video', 'audio'].includes(source)
      ? modifiers.selections.map(path => ({
          key: path,
          name: get(files.find(file => file.path === path), 'name', ''),
        }))
      : modifiers.selections.map(index => ({
          key: index,
          name: get(
            files.find(file => file.path === currentPlaylist.tracks[index]),
            'name',
            '',
          ),
        }));

  return (
    <div css={merge({}, styles.root, modifiers.show ? styles.rootShow : {})}>
      <div css={styles.selections}>
        {selections.map(({ name, key }) => (
          <Text key={key} css={styles.selection}>
            {name}
          </Text>
        ))}
      </div>
      <div css={styles.optionsContainer}>
        <div css={styles.options}>
          {hasSelections && (
            <Button
              type="primary"
              onClick={() => dispatch({ type: 'modifiers-selections-reset' })}
            >
              Delect All
            </Button>
          )}
          {!['video', 'audio', 'playlists'].includes(source) && (
            <div>
              <H2>Edit playlist name</H2>
              <div className="name">
                <Input
                  placeholder="Name"
                  value={playlistName === undefined ? source : playlistName}
                  onChange={e => playlistNameSet(e.target.value)}
                />
                <Button
                  shape="circle"
                  icon="check"
                  onClick={() => editPlaylistName()}
                />
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
          {hasSelections && source !== 'playlists' && (
            <div>
              <H2>Add to playlist</H2>
              <div className="playlists">
                <Select
                  value={selectedPlaylist}
                  options={playlists.map(({ name }) => ({
                    key: name,
                    value: name,
                    title: name,
                  }))}
                  onChange={value => selectedPlaylistSet(value)}
                />
                <Button
                  shape="circle"
                  disabled={selectedPlaylist === undefined}
                  icon="plus"
                  onClick={addToPlaylist}
                />
              </div>
            </div>
          )}
          {hasSelections && !['video', 'audio', 'playlists'].includes(source) && (
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
};

Modifiers.propTypes = {
  source: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Modifiers;
