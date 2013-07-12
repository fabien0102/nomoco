/**
 * Module dependencies
 **/
var Servo = require('./servo');

/**
 * Export the constructor
 **/
module.exports = Head;

/**
 * Inherits from Servo
 **/
util.inherits(Head, Servo);

/**
 * Head of Hexy
 *
 * @param {Communication} com
 **/
function Head(com) {
  // Inherit Servo
  Servo.call(this);
  
  this.com = com;
  this.number = 31;
}

/**
 * Turn the head
 *
 * @param {String|Int} position 
 **/
Head.prototype.turn = function (position) {
  switch (position) {
  case 'left':
    position = 90;
    break;
  case 'right':
    position = -90;
    break;
  case 'center':
    position = 0;
    break;
  }
  this.position = position;
}