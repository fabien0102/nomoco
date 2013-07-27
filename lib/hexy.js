/**
 * Modules dependencies
 **/
var EventEmitter = require('events').EventEmitter;
var Communication = require('./communication');
var util = require('util');
var Head = require('./head');
var Leg = require('./leg');

/**
 * Expose createHexy()
 */
exports = module.exports = function(options){
  var hexy = new Hexy(options);
  return hexy;
};


/**
 * Inherits from EventEmitter
 **/
util.inherits(Hexy, EventEmitter);

/**
 * Create Hexy
 *
 * @api public
 **/
function Hexy(options) {
  // Inherit EventEmitter
  EventEmitter.call(this);
  
  var self = this;
  
  self.com = new Communication();
  self.com.on('ready', function () {
    self.head = new Head(self.com, 31);
    
    // Legs params: communication, hipServo, kneeServo, ankleServo, offsetX, offsetY, coeff
    self.RF = new Leg(self.com, 24, 25, 26, 65.8, 76.6, -0.8587); 
    self.RM = new Leg(self.com, 20, 21, 22, 103.3, 0, 0);
    self.RB = new Leg(self.com, 16, 17, 18, 65.8, -76.6, 0.8587);
    
    self.LF = new Leg(self.com, 7, 6, 5, -65.8, 76.3, -2.2829);
    self.LM = new Leg(self.com, 11, 10, 9, -103.3, 0, 0);
    self.LB = new Leg(self.com, 15, 14, 13, -65.8, -76.3, 2.2829);
    
    self.emit('ready');
  });
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