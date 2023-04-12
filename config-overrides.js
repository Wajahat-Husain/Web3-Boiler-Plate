module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url")
  })
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
}


// "start": "react-scripts start" // existing
// "start": "react-app-rewired start" // use this one

// npm install -D react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url

// Add a polyfill.js file, copy and paste the below code and import it on the first line of the index.js file of the project import(‘./polyfill’)

// import { Buffer } from 'buffer';

// window.global = window;
// global.Buffer = Buffer;
// global.process = {
//     env: { DEBUG: undefined },
//     version: '',
//     nextTick: require('next-tick')
// };