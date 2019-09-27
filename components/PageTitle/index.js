import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import translations from '../lib/translations';

const PageTitle = ({ title }) => (
  <Head>
    <title>
      {translations.siteName}
      {title ? `${translations.siteDivider}${title}` : ''}
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
