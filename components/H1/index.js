import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const H1 = ({ rootCss, ...props }) => (
  <div css={[styles.root, ...rootCss]} {...props} />
);

H1.propTypes = {
  rootCss: PropTypes.array,
};

H1.defaultProps = {
  rootCss: [],
};

export default H1;
