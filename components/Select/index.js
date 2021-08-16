import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import styles from './styles';

const Select = ({ options, value, icon, rootCss, ...props }) => (
  <div css={[styles.root, icon ? styles.rootWithIcon : {}, ...rootCss]}>
    {Boolean(icon) && (
      <span css={styles.icon}>
        <Icon icon={icon} />
      </span>
    )}
    <select>
      <option value="" label="" />
      {options.map(({ key, title, value }) => (
        <option key={key} value={value}>
          {title}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  rootCss: PropTypes.array,
};

Select.defaultProps = {
  icon: '',
  value: undefined,
  rootCss: [],
};

export default Select;
