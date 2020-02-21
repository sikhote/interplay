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
  loading,
  allowLoadingClicks,
  size,
  style,
  onPress,
}) => (
  <TouchableOpacity
    style={Object.assign(
      {},
      styles.root,
      theme === 'secondary' ? styles.rootIsSecondary : styles.rootIsPrimary,
      loading && !allowLoadingClicks ? styles.rootIsLoading : {},
      shape === 'circle' ? styles.rootIsCircle : {},
      size === 'small' ? styles.rootIsSmall : {},
      size === 'small' && shape === 'circle' ? styles.rootIsSmallCircle : {},
      style,
    )}
    onPress={!loading || (loading && allowLoadingClicks) ? onPress : undefined}
  >
    <View>
      <Text color="white" style={loading ? styles.childrenIsLoading : {}}>
        {icon && (
          <Icon
            icon={icon}
            style={Object.assign({}, children ? styles.iconWithChildren : {})}
          />
        )}
        {children}
      </Text>
      <Icon
        style={Object.assign(
          {},
          styles.loadingIcon,
          loading ? styles.loadingIconIsLoading : {},
        )}
        icon="loading animate-spin"
      />
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  allowLoadingClicks: PropTypes.bool,
  theme: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  children: null,
  loading: false,
  icon: '',
  shape: 'rectangle',
  size: 'medium',
  allowLoadingClicks: false,
  theme: 'primary',
  style: {},
};

export default Button;
