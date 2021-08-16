import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const H2 = ({ rootCss, ...props }) => (
  <div css={[styles.root, ...rootCss]} {...props} />
);

H2.propTypes = {
  rootCss: PropTypes.array,
};

H2.defaultProps = {
  rootCss: [],
};

export default H1;
