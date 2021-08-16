import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { c } from 'lib/styling';
import styles from './styles';

const Slider = ({ color, value, min, max, onChange, style, ...props }) => {
  const [isMoving, isMovingSet] = useState(false);
  const [lastMovement, lastMovementSet] = useState(0);
  const progress = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      isMovingSet(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [lastMovement]);

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const relativeClickX = event.pageX - left;
      const percent = relativeClickX / width;
      onChange((max - min) * percent);
      lastMovementSet(Date.now());
    },
    [min, max, onChange],
  );

  const onMouseMove = useCallback(
    (event) => {
      if (isMoving) {
        onClick(event);
      }
    },
    [isMoving, onClick],
  );

  return (
    <View
      style={[styles.root, style]}
      onClick={onClick}
      onMouseDown={() => isMovingSet(true)}
      onMouseUp={() => isMovingSet(false)}
      onMouseMove={onMouseMove}
      {...props}
    >
      <View
        style={[
          styles.rail,
          {
            backgroundImage: `linear-gradient(to right, ${color} ${progress}%, rgba(0, 0, 0, 0.3) ${progress}%)`,
          },
        ]}
      />
      <View style={styles.handleContainer}>
        <View style={[styles.handle, { left: `${progress}%` }]} />
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
  color: c.a,
  style: {},
};

export default Slider;
