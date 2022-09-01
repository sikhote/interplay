import React from 'react';
import List from 'components/List';

const Recent = (props) => (
  <List
    {...props}
    key="recent"
    title="recent"
    header="Recent"
    source="recent"
  />
);

export default Recent;
