import React from 'react';
import PropTypes from 'prop-types';
import { Switch as RNSwitch, View } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../lib/styling';
import styles from './styles';

const Switch = ({
  value,
  color,
  checkedIcon,
  unCheckedIcon,
  style,
  ...props
}) => (
  <View style={Object.assign({}, styles.root, { color }, style)}>
    <Icon
      style={Object.assign({}, styles.icon, {
        color: value ? color : colors.textFaded,
      })}
      icon={value ? checkedIcon : unCheckedIcon}
    />
    <RNSwitch
      activeThumbColor={colors.white}
      trackColor="rgb(204, 204, 204)"
      activeTrackColor={color}
      value={value}
      {...props}
    />
  </View>
);

Switch.propTypes = {
  color: PropTypes.string,
  checkedIcon: PropTypes.string.isRequired,
  unCheckedIcon: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

Switch.defaultProps = {
  color: colors.a,
  style: {},
};

export default Switch;
