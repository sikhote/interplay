import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Button = ({
  theme,
  children,
  icon,
  shape,
  loading,
  allowLoadingClicks,
  size,
  ...props
}) => (
  <div
    role="button"
    css={merge(
      {},
      styles.root,
      theme === 'primary' ? styles.rootIsPrimary : {},
      theme === 'secondary' ? styles.rootIsSecondary : {},
      loading && !allowLoadingClicks ? styles.rootIsLoading : {},
      shape === 'circle' ? styles.rootIsCircle : {},
      size === 'small' ? styles.rootIsSmall : {},
      size === 'small' && shape === 'circle' ? styles.rootIsSmallCircle : {},
    )}
    {...props}
  >
    <Text color="white" css={loading && styles.childrenIsLoading}>
      {icon && (
        <Icon
          icon={icon}
          css={merge({}, children ? styles.iconWithChildren : {})}
        />
      )}
      {children}
    </Text>
    <Icon
      css={merge(
        {},
        styles.loadingIcon,
        loading ? styles.loadingIconIsLoading : {},
      )}
      icon="loading animate-spin"
    />
  </div>
);

Button.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  allowLoadingClicks: PropTypes.bool,
  theme: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  loading: false,
  icon: '',
  shape: 'rectangle',
  size: 'medium',
  allowLoadingClicks: false,
  theme: 'primary',
};

export default Button;
