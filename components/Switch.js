import React from 'react';
import PropTypes from 'prop-types';
import { Switch as ASwitch } from 'antd';

const Slider = ({ color, ...props }) => (
  <div className={color && 'custom'}>
    <style jsx>{`
      :global(.custom .ant-switch-checked) {
        background-color: ${color};
      }
    `}</style>
    <ASwitch {...props} />
  </div>
);

Slider.propTypes = {
  color: PropTypes.string,
};

Slider.defaultProps = {
  color: undefined,
};

export default Slider;
