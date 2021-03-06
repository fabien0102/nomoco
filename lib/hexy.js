/**
 * Modules dependencies
 **/
var Communication = require('./communication');
var Head = require('./head');
var Leg = require('./leg');

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
    hexy.head = new Head(hexy.com, 31);
    
    hexy.RF = new Leg(hexy.com, 24, 25, 26);
    hexy.RM = new Leg(hexy.com, 20, 21, 22);
    hexy.RB = new Leg(hexy.com, 16, 17, 18);
    
    hexy.LF = new Leg(hexy.com, 7, 6, 5);
    hexy.LM = new Leg(hexy.com, 11, 10, 9);
    hexy.LB = new Leg(hexy.com, 15, 14, 13);
  });

  return hexy;
}