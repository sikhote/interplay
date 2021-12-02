import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';

const InputSelect = ({ options, value, icon, rootCss, ...props }) => (
  <Input
    {...{
      icon,
      rootCss,
      InputComponent: () => (
        <select {...props}>
          <option value="" label="" />
          {options.map(({ key, title, value }) => (
            <option key={key} value={value}>
              {title}
            </option>
          ))}
        </select>
      ),
    }}
  />
);

InputSelect.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  rootCss: PropTypes.array,
};

InputSelect.defaultProps = {
  icon: '',
  value: undefined,
  rootCss: [],
};

export default InputSelect;
