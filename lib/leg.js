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
  this.hip = new Servo(com, number = hipServoNum);
  this.knee = new Servo(com, number = kneeServoNum);
  this.ankle = new Servo(com, number = ankleServoNum);
}

/**
 * Set foot Y
 *
 * @param {Int} footY
 **/
Leg.prototype.setFootY = function (footY) {
  if (footY < 75 && footY > -75) {
    var kneeAngle = Math.asin(footY/75) * (180 / Math.PI);
    var ankleAngle = 90-kneeAngle;
    
    this.knee.position = kneeAngle;
    this.ankle.position = ankleAngle;
  }
}
