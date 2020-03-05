import React from 'react';
import PropTypes from 'prop-types';
import { Switch as RNSwitch, View } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../lib/styling';
import styles from './styles';

const Switch = ({ value, color, checkedIcon, unCheckedIcon, ...props }) => (
  <View style={Object.assign({}, styles.root, { color })}>
    <Icon style={styles.icon} icon={value ? checkedIcon : unCheckedIcon} />
    <RNSwitch
      activeThumbColor={color}
      trackColor="rgb(204, 204, 204)"
      activeTrackColor="rgb(204, 204, 204)"
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
};

Switch.defaultProps = {
  color: colors.a,
};

export default Switch;
