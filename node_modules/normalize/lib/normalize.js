/**
 * Module dependencies.
 */

var stylus = require('stylus');

/**
 * Expose callback function.
 */

exports = module.exports = plugin;

/**
 * Library version.
 */

exports.version = '0.2.0';

/**
 * Stylus path.
 */

exports.path = __dirname;

/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */

function plugin() {
  return function(style) {
    style.include(__dirname);
  };
}
