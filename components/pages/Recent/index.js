import React from 'react';
import List from '../../List';

export default (props) => (
  <List
    {...props}
    key="recent"
    title="recent"
    header="Recent"
    source="recent"
  />
);
