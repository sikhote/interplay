import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { View, TouchableWithoutFeedback } from 'react-native';
import arrayMove from 'array-move';
import Button from '../Button';
import Select from '../Select';
import Input from '../Input';
import H2 from '../H2';
import { titleToSlug } from '../../lib/playlists';
import styles from './styles';

const Options = ({ dispatch, store }) => {
  const { playlists, options } = store;
  const { context = {}, key, value } = options;
  const { playlist, index } = context;

  const [playlistName, playlistNameSet] = useState(undefined);
  const [selectedPlaylist, selectedPlaylistSet] = useState(undefined);
  const [currentIndex, currentIndexSet] = useState(index);

  if (currentIndex === undefined && index >= 0) {
    currentIndexSet(index);
  }

  const reset = useCallback(() => {
    dispatch({ type: 'options-reset' });
    currentIndexSet(undefined);
  }, [dispatch]);

  const editPlaylistName = () => {
    const currentPlaylist = playlists.find(({ name }) => name === value);
    const slug = titleToSlug(playlistName);
    currentPlaylist.name = playlistName;
    dispatch({ type: 'playlists-update', payload: currentPlaylist });
    Router.push('/playlists/[id]', `/playlists/${slug}`);
    reset();
  };

  const moveItem = (isMovingUp) => {
    const currentPlaylist = playlists.find(({ name }) => name === playlist);
    const newIndex =
      !isMovingUp && currentIndex === currentPlaylist.tracks.length - 1
        ? 0
        : isMovingUp && currentIndex === 0
        ? currentPlaylist.tracks.length
        : currentIndex + (isMovingUp ? -1 : 1);
    arrayMove.mutate(currentPlaylist.tracks, currentIndex, newIndex);
    currentIndexSet(newIndex);
    dispatch({ type: 'playlists-update', payload: currentPlaylist });
  };

  const addToPlaylist = () => {
    const currentPlaylist = playlists.find(
      ({ name }) => name === selectedPlaylist,
    );
    currentPlaylist.tracks.push(value);
    dispatch({ type: 'playlists-update', payload: currentPlaylist });
    reset();
  };

  const deleteFromPlaylist = () => {
    const currentPlaylist = playlists.find(({ name }) => name === playlist);
    currentPlaylist.tracks.splice(currentIndex, 1);
    dispatch({ type: 'playlists-update', payload: currentPlaylist });
    reset();
  };

  const deletePlaylist = () => {
    // If currently on this playlist, navigate away
    if (value !== 'playlists') {
      Router.push('/playlists');
    }

    dispatch({ type: 'playlists-remove', payload: [value] });
    reset();
  };

  return (
    <View style={[styles.root, key && value ? styles.rootShow : {}]}>
      <TouchableWithoutFeedback onPress={reset}>
        <View style={styles.close} />
      </TouchableWithoutFeedback>
      <View style={styles.inner}>
        {key === 'source' &&
          !['video', 'audio', 'playlists', 'recent'].includes(value) && (
            <>
              <View>
                <H2>Edit playlist name</H2>
                <View style={styles.inputAndButton}>
                  <Input
                    style={styles.inputAndButtonInput}
                    placeholder="Name"
                    value={playlistName === undefined ? value : playlistName}
                    onChangeText={(text) => playlistNameSet(text)}
                  />
                  <Button
                    shape="circle"
                    icon="check"
                    onPress={editPlaylistName}
                  />
                </View>
              </View>
              <Button type="primary" onPress={deletePlaylist}>
                Delete Playlist
              </Button>
            </>
          )}
        {key === 'item' && (
          <View>
            <H2>Add to playlist</H2>
            <View style={styles.inputAndButton}>
              <Select
                style={styles.inputAndButtonInput}
                value={selectedPlaylist}
                options={playlists.map(({ name }) => ({
                  key: name,
                  value: name,
                  title: name,
                }))}
                onValueChange={(value) => selectedPlaylistSet(value)}
              />
              <Button
                shape="circle"
                disabled={selectedPlaylist === undefined}
                icon="plus"
                onPress={addToPlaylist}
              />
            </View>
          </View>
        )}
        {key === 'item' && Boolean(context.playlist) && (
          <View style={styles.moveUpAndDown}>
            <Button
              style={styles.moveButtonLeft}
              type="primary"
              onPress={() => moveItem(true)}
            >
              Move Up
            </Button>
            <Button
              style={styles.moveButtonRight}
              type="primary"
              onPress={() => moveItem(false)}
            >
              Move Down
            </Button>
          </View>
        )}
        {key === 'item' && Boolean(playlist) && (
          <Button type="primary" onPress={deleteFromPlaylist}>
            Delete Item
          </Button>
        )}
      </View>
    </View>
  );
};

Options.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Options;
