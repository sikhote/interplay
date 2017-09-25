import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

const Page = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Page;
