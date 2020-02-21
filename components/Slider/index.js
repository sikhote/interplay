import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { colors } from '../../lib/styling';
import styles from './styles';

const Slider = ({
  color,
  value,
  min,
  max,
  step,
  tip,
  onChange,
  style,
  ...props
}) => {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div style={Object.assign({}, styles.root, style)} {...props}>
      <div
        style={merge({}, styles.rail, {
          background: `linear-gradient(to right, ${color} 0%, ${color} ${progress}%, rgba(0, 0, 0, 0.3) ${progress}%, rgba(0, 0, 0, 0.3) 100%)`,
        })}
      />
      <input
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
      />
    </div>
  );
};

Slider.propTypes = {
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  tip: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.any,
};

Slider.defaultProps = {
  color: colors.a,
  tip: '',
  step: 0.05,
  style: {},
};

export default Slider;
