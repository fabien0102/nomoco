/**
 * Modules dependencies
 **/
var EventEmitter = require('events').EventEmitter;
var Communication = require('./communication');
var Head = require('./head');
var Leg = require('./leg');

/**
 * Expose createHexy()
 */
exports = module.exports = Hexy;

/**
 * Create Hexy
 *
 * @api public
 **/
function Hexy(options) {
  // Inherit EventEmitter
  EventEmitter.call(this);
  
  var self = this;
  var hexy = new EventEmitter;
  hexy.com = new Communication();
  hexy.com.on('ready', function () {
    hexy.head = new Head(hexy.com, 31);
    
    // Legs params: communication, hipServo, kneeServo, ankleServo, offsetX, offsetY, coeff
    hexy.RF = new Leg(hexy.com, 24, 25, 26, 65.8, 76.6, -0.8587); 
    hexy.RM = new Leg(hexy.com, 20, 21, 22, 103.3, 0, 0);
    hexy.RB = new Leg(hexy.com, 16, 17, 18, 65.8, -76.6, 0.8587);
    
    hexy.LF = new Leg(hexy.com, 7, 6, 5, -65.8, 76.3, -2.2829);
    hexy.LM = new Leg(hexy.com, 11, 10, 9, -103.3, 0, 0);
    hexy.LB = new Leg(hexy.com, 15, 14, 13, -65.8, -76.3, 2.2829);
    
    hexy.emit('ready');
  });

  return hexy;
}

/**
 * Move Hexy to position relative to "neutral" position
 *
 * @param {Int} x
 * @param {Int} y
 * @param {Int} z
 * @param {Int} group [1,2]
 * @api public
 **/
Hexy.prototype.globalOffset = function (x, y, z, group) {
  // Neutral position definition
  var neutralZ = -85;
  var neutralY = 110;
  var neutralX = 110;
  var neutralMidX = 150;

  // Move Hexy to position relative to neutral postition
  if (group == 1 || group == null) {
    this.LF.ikFullLeg(-neutralX - x, neutralY - y, neutralZ - z);
    this.RM.ikFullLeg(neutralMidX - x, -y, neutralZ - z);
    this.LB.ikFullLeg(-neutralX - x, - neutralY - y, neutralZ - z);
  }
  if (group == 2 || group == null) {
    this.RF.ikFullLeg(neutralX - x, neutralY - y, neutralZ - z);
    this.LM.ikFullLeg(-neutralMidX - x, -y, neutralZ - z);
    this.RB.ikFullLeg(neutralX - x, - neutralY - y, neutralZ - z);
  }
}