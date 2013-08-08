/**
 * Module dependencies
 **/
var Servo = require('./servo');
var async = require('async');
var log = require('node-logging');

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
 * @param {Int} offserX
 * @param {Int} offserY
 * @param {Int} coeff
 *
 **/
function Leg(com, hipServoNum, kneeServoNum, ankleServoNum, offsetX, offsetY, coeff) {
  this.hip = new Servo(com, number = hipServoNum);
  this.knee = new Servo(com, number = kneeServoNum);
  this.ankle = new Servo(com, number = ankleServoNum);

  this.offsetX = offsetX;
  this.offsetY = offsetY;
  this.coeff = coeff;

}

/**
 * Set foot Y
 *
 * @param {Int} footY
 **/
Leg.prototype.setFootY = function (footY) {
  if (footY < 75 && footY > -75) {
    var kneeAngle = degress(Math.asin(footY / 75));
    var ankleAngle = 90 - kneeAngle;

    log.dbg('kneeAngle: ' + kneeAngle);
    log.dbg('ankleAngle: ' + ankleAngle);

    this.knee.position = kneeAngle;
    this.ankle.position = -ankleAngle;
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

  var self = this;
  async.timesSeries(stepPerS, function (n, next) {
    hipAngle = (hipMaxDiff / stepPerS) * (n + 1);

    // Normalize the range of the hip movement to 180 deg
    if (hipMaxDiff != 0) {
      anglNom = hipAngle * (180 / hipMaxDiff);
    } else {
      anglNom = hipAngle * 180;
    }

    // Base footfall on a sin pattern from footfall to footfall with 0 as the midpoint
    footY = footMin - Math.sin(radians(anglNom)) * footRange;

    // Set foot height
    self.setFootY(footY);
    hipAngle = currentHipAngle + hipAngle;
    self.hip.position = hipAngle;

    // Wait fot next cycle
    setTimeout(next, stepTime / stepPerS);

  }, function () {});
}

/**
 * Move leg in global co-ordinate system (IK)
 *
 * @param {Int} x
 * @param {Int} y
 * @param {Int} z
 **/
Leg.prototype.ikFullLeg = function (x, y, z) {
  // Position offset
  x = x - this.offsetX;
  y = y - this.offsetY;

  var legX = Math.cos(this.coeff) * x - Math.sin(this.coeff) * y;
  var legY = Math.sin(this.coeff) * x + Math.cos(this.coeff) * y;

  // IK Calcul
  var alpha = Math.degrees(Math.atan2(legY, legX));
  var lowerLegAngles = ikLowerLeg(Math.sqrt(legX * legX + legY * legY) - 26, -z);

  // Mouvements
  this.hip.position = alpha;
  this.knee.position = lowerLegAngles[0];
  this.ankle.position = lowerLegAngles[1];
}

/**
 * Inverse Kinematic function for lower leg joints
 *
 * @param {Int} x
 * @param {Int} y
 **/
function ikLowerLeg (x, y) {
  var a = 49;
  var b = 52;

  var d = Math.sqrt(x*x+y*y);
  var k = (d*d-b*b+a*a)/(2*d);
  var m = Math.sqrt(a*a-k*k);

  if (k == -Infinity) {
    log.err('Division by zero! No valid join solution.');
    return;
  }
  if (!isFinite(m)) {
    log.err('Math function error. Probably square root of negative number. No valid joint solution.');
    return;
  }

  var theta = Math.degrees(Math.atan2(y, x)-Math.atan2(m, k));
  var phi = -Math.degrees(Math.atan2(m, k)+Math.atan2(m, (d-k)));

  return [theta, phi];
}