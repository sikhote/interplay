import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Button = ({ children, icon, shape, loading, ...props }) => (
  <div
    role="button"
    css={merge(
      {},
      styles.root,
      loading ? styles.rootIsLoading : {},
      shape === 'circle' ? styles.rootIsCircle : {},
    )}
    {...props}
  >
    <Text color="white" css={loading && styles.childrenIsLoading}>
      {icon && <Icon icon={icon} />}
      {children}
    </Text>
    <Icon
      css={merge({}, styles.icon, loading ? styles.iconIsLoading : {})}
      icon="loading animate-spin"
    />
  </div>
);

Button.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  loading: false,
  icon: '',
  shape: 'rectangle',
};

export default Button;
