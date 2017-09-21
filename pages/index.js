import React from 'react';
import PropTypes from 'prop-types';

const Para = ({ text }) => <p>{text}</p>;

Para.propTypes = {
  text: PropTypes.string.isRequired,
};

export default () => (
  <div>
    <style jsx>{`
      p {
        color: blue;
      }
    `}</style>
    Hello world
    <Para text="hiii" />
  </div>
);
