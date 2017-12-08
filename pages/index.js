import React from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';

const Player = () => <Page>Player goes here</Page>;

export default withRedux(initStore, null, null)(Player);
