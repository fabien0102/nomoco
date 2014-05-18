/**
 * Export the constructor
 **/
module.exports = Servo;

/**
 * Main Servo construtor
 * Low level servo-motor controller
 *
 * @param {Communication} com
 * @param {Int} number (1 to 30)
 *
 **/
function Servo(com, number) {
  this.com = com;
  this.number = number;
  this._position = null;
}

/**
 * Set a position in degrees
 *
 * @param {value,unit}
 *  or
 * @param int value (-90° to 90°)
 **/
Servo.prototype.__defineSetter__('position', function (position) {
  var unit = position.unit || 'degree';
  var value = position.value || position;
  var ms;
  var self = this;

  // Unit conversion
  if (unit == 'degree') {
    ms = Math.round(1500 + value * 11.1111111);
  } else {
    ms = value;
  }

  if (this.position != ms && ms >= 500 && ms <= 2500) {
    this.com.write('#' + this.number + 'P' + ms);
    this._position = ms;
  }

  /*setTimeout(function () {
    self.kill();
  }, 1000);*/
});

/**
 * Get position in degrees
 *
 * @return {Int} position
 **/
Servo.prototype.__defineGetter__('position', function () {
  return Math.round((this._position - 1500) / 11.1111111);
});

/**
 * Kill servo
 **/
Servo.prototype.kill = function () {
  this.com.write('#' + this.number + 'L');
};

/**
 * Kill all servos
 **/
Servo.prototype.killAll = function () {
  this.com.write('K');
};

/**
 * Center all servos
 **/
Servo.prototype.centerAll = function () {
  this.com.write('C');
};
