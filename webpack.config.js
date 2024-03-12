const webpack = require('webpack');

module.exports = {
  // ...other Webpack configuration options...

  plugins: [
    new webpack.ProvidePlugin({
      SockJS: 'sockjs-client',
      Stomp: 'stompjs',
    }),
    // ...other plugins...
  ],
};
