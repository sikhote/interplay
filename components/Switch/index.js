import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { lighten } from 'polished';
import Button from '../Button';
import { colors } from '../../lib/styling';
import styles from './styles';

const Switch = ({
  color,
  checkedIcon,
  unCheckedIcon,
  checked,
  onChange,
  size,
  ...props
}) => (
  <Button
    size={size}
    shape="circle"
    icon={checked ? checkedIcon : unCheckedIcon}
    css={merge(
      {},
      styles.root,
      checked
        ? {
            background: color,
            '&:active': {
              background: lighten(0.1, color),
            },
          }
        : {},
    )}
    role="button"
    onClick={() => onChange(!checked)}
    {...props}
  />
);

Switch.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  checkedIcon: PropTypes.string.isRequired,
  unCheckedIcon: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  color: colors.a,
  size: 'small',
};

export default Switch;
