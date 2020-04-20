import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Button = ({
  theme,
  children,
  icon,
  shape,
  isLoading,
  isAllowingLoadingClicks,
  size,
  style,
  onPress,
  isEnclosed,
}) => (
  <TouchableOpacity
    style={Object.assign(
      {},
      styles.root,
      theme === 'secondary' ? styles.rootIsSecondary : {},
      theme === 'subtle' ? styles.rootIsSubtle : {},
      isLoading && !isAllowingLoadingClicks ? styles.rootIsLoading : {},
      shape === 'circle' ? styles.rootIsCircle : {},
      size === 'small' ? styles.rootIsSmall : {},
      size === 'small' && shape === 'circle' ? styles.rootIsSmallCircle : {},
      size === 'large' ? styles.rootIsLarge : {},
      size === 'large' && shape === 'circle' ? styles.rootIsLargeCircle : {},
      isEnclosed ? {} : styles.rootIsNotEnclosed,
      style,
    )}
    onPress={
      !isLoading || (isLoading && isAllowingLoadingClicks) ? onPress : undefined
    }
  >
    <View>
      <Text color="white" style={isLoading ? styles.childrenIsLoading : {}}>
        {Boolean(icon) && (
          <Icon
            icon={icon}
            style={Object.assign(
              {},
              theme === 'subtle' && !isEnclosed
                ? styles.iconIsNotEnclosedIsSubtle
                : {},
              children ? styles.iconWithChildren : {},
            )}
          />
        )}
        {children}
      </Text>
      <Icon
        style={Object.assign(
          {},
          styles.loadingIcon,
          isLoading ? styles.loadingIconIsLoading : {},
        )}
        icon="loading animate-spin"
      />
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  isAllowingLoadingClicks: PropTypes.bool,
  theme: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isEnclosed: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  isLoading: false,
  icon: '',
  shape: 'rectangle',
  size: 'medium',
  isAllowingLoadingClicks: false,
  theme: 'primary',
  style: {},
  isEnclosed: true,
};

export default Button;
