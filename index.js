import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import antd from 'antd/dist/antd.css';

const Index = ({ children }) => (
  <div>
    <Head>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css"
      />
    </Head>
    <style dangerouslySetInnerHTML={{ __html: antd }} />
    <style jsx global>{`
      body {
      }
    `}</style>
    {children}
  </div>
);

Index.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Index;
