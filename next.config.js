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
        use: [
          {
            loader: 'style-loader!css-loader',
            options: {},
          },
        ],
      }),
    });

    config.plugins.push(new ExtractTextPlugin('static/app.css'));

    return config;
  },
};
