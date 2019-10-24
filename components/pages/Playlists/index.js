import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { get } from 'lodash';
import List from '../../List';
import { titleToSlug } from '../../../lib/playlists';

const Playlists = ({ id, store, dispatch }) => {
  const { playlists } = store;
  const playlist = playlists.find(({ name }) => titleToSlug(name) === id);
  console.log(id);

  return id && !playlist ? (
    <Error statusCode={404} />
  ) : (
    <List
      key={id || 'playlists'}
      title={get(playlist, 'name') || 'playlists'}
      header={get(playlist, 'name') || 'Playlists'}
      source={playlist ? playlist.name : 'playlists'}
      store={store}
      dispatch={dispatch}
    />
  );
};

Playlists.getInitialProps = ({ query: { id } }) => ({ id });

Playlists.propTypes = {
  id: PropTypes.string,
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Playlists.defaultProps = {
  id: '',
};

export default Playlists;
