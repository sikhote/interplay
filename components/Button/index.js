import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styles from './styles';

const Button = ({
  theme,
  children,
  icon,
  shape,
  isLoading,
  size,
  rootCss,
  onClick,
  isEnclosed,
}) => (
  <button
    css={[
      styles.root,
      theme === 'secondary' ? styles.rootIsSecondary : {},
      theme === 'subtle' ? styles.rootIsSubtle : {},
      isLoading ? styles.rootIsLoading : {},
      shape === 'circle' ? styles.rootIsCircle : {},
      size === 'small' ? styles.rootIsSmall : {},
      size === 'small' && shape === 'circle' ? styles.rootIsSmallCircle : {},
      size === 'large' ? styles.rootIsLarge : {},
      size === 'large' && shape === 'circle' ? styles.rootIsLargeCircle : {},
      isEnclosed ? {} : styles.rootIsNotEnclosed,
      ...rootCss,
    ]}
    onClick={onClick}
  >
    <div css={[styles.children, isLoading ? styles.childrenIsLoading : {}]}>
      {Boolean(icon) && (
        <Icon
          icon={icon}
          rootCss={[
            theme === 'subtle' && !isEnclosed
              ? styles.iconIsNotEnclosedIsSubtle
              : {},
            children ? styles.iconWithChildren : {},
          ]}
        />
      )}
      {children}
    </div>
    <Icon
      rootCss={[
        styles.loadingIcon,
        isLoading ? styles.loadingIconIsLoading : {},
      ]}
      icon="loading animate-spin"
    />
  </button>
);

Button.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.string,
  rootCss: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  isEnclosed: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  isLoading: false,
  icon: '',
  shape: 'rectangle',
  size: 'medium',
  theme: 'primary',
  rootCss: [],
  isEnclosed: true,
};

export default Button;
