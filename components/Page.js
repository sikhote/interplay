import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import App from './App';

const Page = ({ children }) => (
  <App>
    <style jsx>{`
      .main  {
        display: grid;
        grid: 1fr / 200px 1fr;
        height: 100vh;
      }
    `}</style>
    <div className="main">
      <Navigation />
      <div>
        {children}
      </div>
    </div>
  </App>
);

Page.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Page;
