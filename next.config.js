const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/audio': { page: '/audio' },
    '/video': { page: '/video' },
    '/settings': { page: '/settings' },
  }),
  webpack: config => {
    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    });

    config.plugins.push(new ExtractTextPlugin('static/app.css'));

    return config;
  },
};
