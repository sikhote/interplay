import React from 'react';
import styles from './styles';

const Icon = ({ icon, rootCss = [], ...props }) => (
  <span css={[styles.root, ...rootCss]} {...props}>
    <span className={`icon-${icon}`} />
  </span>
);

export default Icon;
