import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import l from 'lib/language';

const PageTitle = ({ title }) => (
  <Head>
    <title>
      {l.global.name}
      {title ? `${l.global.divider}${title}` : ''}
    </title>
  </Head>
);

PageTitle.propTypes = {
  title: PropTypes.string,
};

PageTitle.defaultProps = {
  title: '',
};

export default PageTitle;
