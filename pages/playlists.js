import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import List from '../components/List';
import { titleToSlug } from '../lib/playlists';

const Playlists = ({ alpha: slug, playlists: { playlists } }) => {
  const playlist = playlists.find(({ name }) => titleToSlug(name) === slug);

  return (
    <List
      key={slug || 'playlists'}
      title={get(playlist, 'name') || 'playlists'}
      header={get(playlist, 'name') || 'Playlists'}
      source={playlist ? playlist.name : 'playlists'}
    />
  );
};

Playlists.getInitialProps = ({ query: { alpha } }) => ({ alpha });

Playlists.propTypes = {
  alpha: PropTypes.string,
  playlists: PropTypes.object.isRequired,
};

Playlists.defaultProps = {
  alpha: '',
};

export default connect(({ playlists }) => ({ playlists }))(Playlists);
