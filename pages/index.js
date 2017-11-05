import React from 'react';
import inject from '../lib/inject';
import Page from '../components/Page';

const Player = () => (
  <Page>
    Hello there
  </Page>
);

export default inject(Player);
