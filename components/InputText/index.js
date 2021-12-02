import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';

const InputText = ({ icon, rootCss, ...props }) => (
  <Input
    {...{
      icon,
      rootCss,
      InputComponent: () => (
        <input {...props} />
      ),
    }}
  />
);

InputText.propTypes = {
  icon: PropTypes.string,
  rootCss: PropTypes.array,
};

InputText.defaultProps = {
  icon: '',
  rootCss: [],
};

export default InputText;

