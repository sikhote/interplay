import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { merge } from 'lodash';
import { colors } from '../../lib/styling';
import styles from './styles';
// determine way to stop dragging when mouse goes outside of region
const Slider = ({ color, value, min, max, onChange, style, ...props }) => {
  const [isMoving, isMovingSet] = useState(false);
  const progress = ((value - min) / (max - min)) * 100;

  const onClick = useCallback(
    e => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const relativeClickX = e.pageX - left;
      const percent = relativeClickX / width;
      console.log(percent)
      onChange((max - min) * percent);
    },
    [min, max, onChange],
  );

  const onMouseMove = useCallback(
    e => {
      if (isMoving) {
        onClick(e);
      }
    },
    [isMoving, onClick],
  );

  return (
    <View
      style={Object.assign({}, styles.root, style)}
      onClick={onClick}
      onMouseDown={() => isMovingSet(true)}
      onMouseUp={() => isMovingSet(false)}
      onMouseMove={onMouseMove}
      {...props}
    >
      <View
        style={merge({}, styles.rail, {
          background: `linear-gradient(to right, ${color} ${progress}%, rgba(0, 0, 0, 0.3) ${progress}%)`,
        })}
      />
      <View style={styles.handleContainer}>
        <View style={merge({}, styles.handle, { left: `${progress}%` })} />
      </View>
    </View>
  );
};

Slider.propTypes = {
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.any,
};

Slider.defaultProps = {
  color: colors.a,
  style: {},
};

export default Slider;
