import React from 'react';
import List from 'components/List';
import l from 'lib/language';

const Audio = () => (
  <List
    key="audio"
    title={l.audio.title}
    header={l.audio.header}
    source="audio"
  />
);

export default Audio;
