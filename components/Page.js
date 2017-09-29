import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

const Page = ({ children }) => (
  <div>
    <style jsx>{`
      .main  {
        display: grid;
        grid: 1fr / 200px 1fr;
        height: 100vh;
      }
    `}</style>
    <div className="main">
      <Navigation />
      {children}
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Page;
