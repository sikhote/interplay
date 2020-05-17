import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import List from 'components/List';
import { titleToSlug } from 'lib/playlists';

const Playlist = ({ store, ...props }) => {
  const router = useRouter();
  const { id } = router.query;
  const { playlists } = store;
  const playlist = playlists.find(({ name }) => titleToSlug(name) === id);
  const name = get(playlist, 'name');

  return !id || (id && !playlist) ? (
    <Error statusCode={404} />
  ) : (
    <List
      {...props}
      key={id}
      store={store}
      title={name}
      header={name}
      source={name}
    />
  );
};

Playlist.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Playlist;
