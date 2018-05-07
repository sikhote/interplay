import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import content from '../lib/content';

const CustomHead = ({ title }) => (
  <Head>
    <title>
      {content.name}
      {title ? `${content.divider}${title}` : ''}
    </title>
  </Head>
);

CustomHead.propTypes = {
  title: PropTypes.string,
};

CustomHead.defaultProps = {
  title: '',
};

export default CustomHead;
