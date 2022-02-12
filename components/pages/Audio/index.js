import React from 'react';
import List from 'components/List';
import l from 'lib/language';

export default () => (
  <List
    key="audio"
    title={l.audio.title}
    header={l.audio.header}
    source="audio"
  />
);
