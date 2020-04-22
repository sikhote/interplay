import React from 'react';
import PropTypes from 'prop-types';
import RNLink from 'next/link';

const Link = ({ style, href, id, label }) => (
  <RNLink as={id} href={href || id}>
    <a style={style}>{label}</a>
  </RNLink>
);

Link.propTypes = {
  style: PropTypes.object.isRequired,
  label: PropTypes.any.isRequired,
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Link;
