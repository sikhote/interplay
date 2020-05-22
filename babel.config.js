module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'next/babel'],
    // Plugins: [['react-native-web', { commonjs: true }]],
  };
};
