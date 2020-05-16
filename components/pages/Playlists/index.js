import React from 'react';
import List from 'components/List';

export default (props) => (
  <List
    {...props}
    key="playlists"
    title="playlists"
    header="Playlists"
    source="playlists"
  />
);
