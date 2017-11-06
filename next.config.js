const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/audio': { page: '/audio' },
    '/video': { page: '/video' },
    '/settings': { page: '/settings' },
  }),
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.css$/,
      loader: 'emit-file-loader',
      options: { name: 'dist/[path][name].[ext]' },
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
      }),
    });

    config.plugins.push(new ExtractTextPlugin(__dirname + '/hello/app.css'));

    return config;
  },
};
