import React from 'react';
import PropTypes from 'prop-types';

const Para = ({ text }) => <p>{text}</p>;

Para.propTypes = {
  text: PropTypes.string.isRequired,
};

export default () => (
  <div>
    Hello world
    <Para text="hiii" />
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: grey;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </div>
);
