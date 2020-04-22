import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import language from '../../lib/language';

const PageTitle = ({ title }) => (
  <Head>
    <title>
      {language.siteName}
      {title ? `${language.siteDivider}${title}` : ''}
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
