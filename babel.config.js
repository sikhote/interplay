module.exports = {
  presets: ['next/babel', '@emotion/babel-preset-css-prop'],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css',
      },
    ],
  ],
};
