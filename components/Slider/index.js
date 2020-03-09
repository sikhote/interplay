import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { merge } from 'lodash';
import { colors } from '../../lib/styling';
import styles from './styles';

const Slider = ({
  color,
  value,
  min,
  max,
  step,
  onChange,
  style,
  ...props
}) => {
  const bgEl = useRef(null);
  const progress = ((value - min) / (max - min)) * 100;
  const onClick = () => {
    const bgData = bgEl.current;
    console.log(bgData);
  };

  return (
    <View
      ref={bgEl}
      style={Object.assign({}, styles.root, style)}
      onClick={onClick}
      {...props}
    >
      <View
        style={merge({}, styles.rail, {
          background: `linear-gradient(to right, ${color} 0%, ${color} ${progress}%, rgba(0, 0, 0, 0.3) ${progress}%, rgba(0, 0, 0, 0.3) 100%)`,
        })}
      />
      <View style={merge({}, styles.slider, { left: `${progress}%` })} />
      {/* <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={merge({}, styles.slider, {
          '&::WebkitSliderThumb': { borderColor: color },
          '&::MozRangeThumb': { borderColor: color },
          '&::MsThumb': { borderColor: color },
        })}
        onChange={e => onChange(Number(e.target.value))}
      /> */}
    </View>
  );
};

Slider.propTypes = {
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.any,
};

Slider.defaultProps = {
  color: colors.a,
  step: 0.05,
  style: {},
};

export default Slider;
