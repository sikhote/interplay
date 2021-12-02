import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styles from './styles';

const Input = ({ icon, size, rootCss, inputCss, InputComponent, ...props }) => (
  <div css={[styles.root, ...rootCss]}>
    {Boolean(icon) && (
      <Icon
        rootCss={[styles.icon, size === 'small' ? styles.iconIsSmall : {}]}
        icon={icon}
      />
    )}
    <div
      css={[
        styles.input,
        icon ? styles.inputIsIcon : {},
        size === 'small' ? styles.inputIsSmall : {},
        size === 'small' && icon ? styles.inputIsIconIsSmall : {},
        ...inputCss,
      ]}
    >
      <InputComponent {...props} />
    </div>
  </div>
);

Input.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  rootCss: PropTypes.array,
  inputCss: PropTypes.array,
};

Input.defaultProps = {
  icon: '',
  size: 'medium',
  rootCss: [],
  inputCss: [],
};

export default Input;
