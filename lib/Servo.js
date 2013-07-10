/**
 * Main Servo construtor
 * Low level servo-motor controller
 * 
 * @param Hexy options.hexy
 * @param int options.number (1 to 30)
 *
 **/
module.exports = Servo;
function Servo(options) {
    //if(!options || !options.hexy || !options.number) thow new Error('Must supply required options to Servo');
    this.hexy = options.hexy;
    this.number = options.number;
    this.position = options.position || 1500; // Center
}

/**
 * Goto a position in degrees
 *
 * @param {value,unit}
 *  or
 * @param int value (-90° to 90°)
 **/
Servo.prototype.goto = function (position) {
    var unit = position.unit || 'degree';
    var value = position.value || position;
    var ms;
    
    // Unit conversion 
    if (position.unit == 'degree') {
        ms = 1500+value*11.1111111;
    } else {
        ms = value;
    }
    
    if (this.position != ms && ms > 500 && ms < 2500 ) {
        this.hexy.write('#' + this.number + 'P' + ms);
        this.position = ms;
    }
    
    this.kill();
}

/**
 * Kill servo
 **/
Servo.prototype.kill = function () {
     this.hexy.write('#' + this.number + 'L');
}

/**
 * Kill all servos
 **/
Servo.prototype.killAll = function () {
     this.write('K');
}

/**
 * Center all servos
 **/
Servo.prototype.centerAll = function () {
     this.write('C');
}