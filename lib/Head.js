/**
 * Module dependencies
 **/
var Servo = require('./servo');

/**
 * Export the constructor
 **/
module.exports = Head;

/**
 * Head of Hexy
 *
 * @param {Communication} com
 **/
function Head(com) {
  this.servo = new Servo(com, number = 31);
  this.position = 1500;
}

/**
 * Turn the head
 *
 * @param {String|Int} position 
 **/
Head.prototype.turn = function (position) {
  switch (position) {
  case 'left':
    this.position = 90;
    break;
  case 'right':
    this.position = -90;
    break;
  case 'center':
    this.position = 0;
    break;
  default:
    this.position = position;
    break;
  }
  this.servo.setPos(this.position);
}