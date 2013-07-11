/**
 * Modules dependencies
 **/
var Communication = require('./communication');
var Head = require('./head');

/**
 * Expose createHexy()
 */
exports = module.exports = createHexy;

/**
 * Create Hexy
 *
 * @api public
 **/
function createHexy(options) {
  var com = new Communication();
  com.on('ready', function () {
    var head = new Head(com);
  });
}