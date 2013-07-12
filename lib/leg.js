/**
 * Module dependencies
 **/
var Servo = require('./servo');
var async = require('async');

/**
 * Export the constructor
 **/
module.exports = Leg;

/**
 * Constants
 **/
// This is the minimum level the legs will reach
var floor = 60;

//  Modifies how smoothly the servos move.
//  Smoother means more processing power, and fills the serial line.
//  Lower if movements start to slow down, or get weird.
//  Anything higher than 50 is pointless ( faster than the maximum refresh of standard servos ).
var stepPerS = 5;

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
    var kneeAngle = Math.asin(footY / 75) * (180 / Math.PI);
    var ankleAngle = 90 - kneeAngle;

    this.knee.position = kneeAngle;
    this.ankle.position = ankleAngle;
  }
}

/**
 * Replan foot
 * Smoothly moves a foot from one position on the ground to another in time seconds
 *
 * @param {Int} endHipAngle
 * @param {Int} stepTime
 **/
Leg.prototype.replantFoot = function (endHipAngle, stepTime) {
  var currentHipAngle = this.hip.position;
  var hipMaxDiff = endHipAngle - currentHipAngle;
  var hipAngle, anglNom, footY;

  // Calculate the absolute distance between the foot's highest and lowest point
  var footMax = 0;
  var footMin = floor;
  var footRange = Math.abs(footMax - footMin);

  async.timesSeries(stepPerS, function (n, next) {
    hipAngle = (hipMaxDiff / stepPerS) * (n + 1);
    
    // Normalize the range of the hip movement to 180 deg
    if (hipMaxDiff != 0) {
      anglNom = hipAngle * (180 / hipMaxDiff);
    } else {
      anglNom = hipAngle * 180;
    }
    
    // Base footfall on a sin pattern from footfall to footfall with 0 as the midpoint
    footY = footMin - Math.sin(anglNom * (Math.PI / 180)) * footRange;
    
    // Set foot height
    this.setFootY(footY);
    this.hip.position = hipAngle;
    
    // Wait fot next cycle
    setTimeout(next,stepTime/stepPerS);
    
  }, function () {});
}