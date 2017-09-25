import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';

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
  <Page>
    <style jsx>{`
      div {
        color: green;
      }
    `}</style>
    Hello world
    <Para text="hiii" />
  </Page>
);
