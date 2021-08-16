import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styles from './styles';

const Input = ({ icon, size, rootCss, ...props }) => (
  <div
    css={[
      styles.root,
      icon ? styles.rootWithIcon : {},
      size === 'small' ? styles.rootIsSmall : {},
      size === 'small' && icon ? styles.rootWithIconIsSmall : {},
      ...rootCss,
    ]}
  >
    {Boolean(icon) && (
      <Icon
        rootCss={[styles.icon, size === 'small' ? styles.iconIsSmall : {}]}
        icon={icon}
      />
    )}
    <input {...props} />
  </div>
);

Input.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  rootCss: PropTypes.any,
};

Input.defaultProps = {
  icon: '',
  size: 'medium',
  rootCss: [],
};

export default Input;
