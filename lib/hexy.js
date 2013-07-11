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
  var hexy = {};
  hexy.com = new Communication();
  hexy.com.on('ready', function () {
    hexy.head = new Head(hexy.com);
  });
  
  return hexy;
}