import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Error from 'next/error';
import { get } from 'lodash';
import List from '../components/List';
import { titleToSlug } from '../lib/playlists';

class Playlists extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }

  render() {
    const { id, playlists } = this.props;
    const playlist = playlists.find(({ name }) => titleToSlug(name) === id);

    return id && !playlist ? (
      <Error statusCode={404} />
    ) : (
      <List
        key={id || 'playlists'}
        title={get(playlist, 'name') || 'playlists'}
        header={get(playlist, 'name') || 'Playlists'}
        source={playlist ? playlist.name : 'playlists'}
      />
    );
  }
}

Playlists.propTypes = {
  id: PropTypes.string,
  playlists: PropTypes.array.isRequired,
};

Playlists.defaultProps = {
  id: '',
};

export default connect(({ playlists }) => ({ playlists }))(Playlists);
