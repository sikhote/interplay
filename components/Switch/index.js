import React from 'react';
import PropTypes from 'prop-types';
import { Switch as RNSwitch, View } from 'react-native';
import Icon from 'components/Icon';
import { c } from 'lib/styling';
import styles from './styles';

const Switch = ({
  isOn,
  color,
  checkedIcon,
  unCheckedIcon,
  style,
  ...props
}) => (
  <View style={[styles.root, { color }, style]}>
    <Icon
      style={[
        styles.icon,
        {
          color: isOn ? color : c.textFaded,
        },
      ]}
      icon={isOn ? checkedIcon : unCheckedIcon}
    />
    <RNSwitch
      activeThumbColor={c.white}
      trackColor="rgb(204, 204, 204)"
      activeTrackColor={color}
      value={isOn}
      {...props}
    />
  </View>
);

Switch.propTypes = {
  color: PropTypes.string,
  checkedIcon: PropTypes.string.isRequired,
  unCheckedIcon: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  style: PropTypes.any,
};

Switch.defaultProps = {
  color: c.a,
  style: {},
};

export default Switch;
