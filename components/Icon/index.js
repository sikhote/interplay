import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Icon = ({ icon, rootCss, ...props }) => (
  <span css={[styles.root, ...rootCss]} {...props}>
    <span className={`icon-${icon}`} />
  </span>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  rootCss: PropTypes.array,
};

Icon.defaultProps = {
  rootCss: [],
};

export default Icon;
