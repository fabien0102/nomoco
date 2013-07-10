/**
 * Main Servo construtor
 * Low level servo-motor controller
 * 
 * @param Hexu options.hexy
 *
 **/
function Servo(options){
    if(!options || !options.hexy) thow new Error('Must supply required options to Servo');
    this.hexy = options.hexy;
}

/**
 * Goto a position in ms
 *
 * @param int servo (1 to 30)
 * @param int ms (500 to 2500)
 **/
Servo.prototype.goto = function (servo, ms) {
    this.hexy.write('#' + servo + 'P' + ms);
}

/**
 * Goto a position in degrees
 *
 * @param int servo (1 to 30)
 * @param int deg (-90 to 90)
 **/
Servo.prototype.gotoDeg = function (servo, deg) {
    var ms = 1500+deg*11.1111111;
    this.hexy.write('#' + servo + 'P' + ms);
}

/**
 * Kill servo
 *
 * @param int servo (1 to 30)
 **/
Servo.prototype.kill(servo) {
     this.hexy.write('#' + servo + 'L');
}

/**
 * Kill all servos
 **/
Servo.prototype.killAll() {
     this.hexy.write('K');
}

/**
 * Center all servos
 **/
Servo.prototype.killAll() {
     this.hexy.write('C');
}