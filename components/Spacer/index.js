import React from 'react';
import PropTypes from 'prop-types';
import { spacing } from '../../lib/styling';
import styles from './styles';

const Spacer = ({ height }) => (
  <div style={{ height }} className="spacer">
    <style jsx>{styles}</style>
  </div>
);

Spacer.propTypes = {
  height: PropTypes.number,
};

Spacer.defaultProps = {
  height: spacing.a5,
};

export default Spacer;
