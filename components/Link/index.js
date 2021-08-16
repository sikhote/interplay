import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'next/router';

const Link = ({ style, asPath, filePath, label }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={style}
      onPress={() => router.push(filePath, asPath)}
    >
      <View>
        <span>{label}</span>
      </View>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  style: PropTypes.any,
  label: PropTypes.any.isRequired,
  asPath: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};

Link.defaultProps = {
  style: {},
};

export default Link;
