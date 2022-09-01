import React from 'react';
import List from 'components/List';

const Playlists = (props) => (
  <List
    {...props}
    key="playlists"
    title="playlists"
    header="Playlists"
    source="playlists"
  />
);

export default Playlists;
