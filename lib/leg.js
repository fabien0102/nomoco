/**
 * Module dependencies
 **/
var Servo = require('./servo');

/**
 * Export the constructor
 **/
module.exports = Leg;

/**
 * Leg of Hexy
 *
 * @param {Communication} com
 * @param {Int} hipServoNum
 * @param {Int} kneeServoNum
 * @param {Int} ankleServoNum
 *
 **/
function Leg(com, hipServoNum, kneeServoNum, ankleServoNum) {
  this.hipServo = new Servo(com, number = hipServoNum);
  this.kneeServo = new Servo(com, number = kneeServoNum);
  this.ankleServo = new Servo(com, number = ankleServoNum);
  
  this.hipServo.position = null;
  this.kneeServo.position = null;
  this.ankleServo.position = null;
}

/**
 * Set position of hip
 *
 * @param {Int} position
 **/
Leg.prototype.hip = function (position) {
  if (position >= -90 && position <= 90 && this.hipServo.position != position) {
    this.hipServo.setPos(position);
    this.hipServo.position == position;
  }
}

/**
 * Set position of knee
 *
 * @param {Int} position
 **/
Leg.prototype.knee = function (position) {
  if (position >= -90 && position <= 90 && this.kneeServo.position != position) {
    this.kneeServo.setPos(position);
    this.kneeServo.position == position;
  }
}

/**
 * Set position of ankle
 *
 * @param {Int} position
 **/
Leg.prototype.ankle = function (position) {
  if (position >= -90 && position <= 90 && this.ankleServo.position != position) {
    this.ankleServo.setPos(position);
    this.ankleServo.position == position;
  }
}
