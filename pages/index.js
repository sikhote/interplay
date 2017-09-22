import React from 'react';
import PropTypes from 'prop-types';

const Para = ({ text }) => (
  <div>
    <style jsx>{`
      p {
        color: blue;
      }
    `}</style>
    <p>{text}</p>
  </div>
);

Para.propTypes = {
  text: PropTypes.string.isRequired,
};

export default () => (
  <div>
    <style jsx>{`
      div {
        color: green;
      }
    `}</style>
    Hello world
    <Para text="hiii" />
  </div>
);
