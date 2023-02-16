
module.exports = {
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "tty": require.resolve("tty-browserify"),
      "zlib": require.resolve("browserify-zlib")
    }
  }
};