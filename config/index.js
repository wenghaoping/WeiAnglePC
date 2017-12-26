'use strict'
// Template version: 1.2.5
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const glob = require('glob');
let build = {
  assetsRoot: path.resolve(__dirname, '../'),
  assetsSubDirectory: 'assets',
  assetsPublicPath: '/',
  productionSourceMap: true,
  devtool: '#source-map',
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report
}
function getEntry(globPath) {
  var entries = {},basename;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    entries[basename] = entry;
  });
  return entries;
}

var pages = getEntry('src/pages/**/*.html');

//每个入口页面生成一个入口添加到build中
for (let pathname in pages) {
  build[pathname] = path.resolve(__dirname, '../assetsHTML/' + pathname + '2.html')
}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'https://pc.dev.weitianshi.cn',
        // target: 'https://wts.weitianshi.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },

    // Various Dev Server settings
    host: '192.168.9.19', // can be overwritten by process.env.HOST
    port: 8090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: build
}
