var Servo = require('./Servo');

/**
 * Hexy's head class
 *
 **/
module.exports = Head;

function Head(options) {
    this.servo = new Servo({hexy:options.hexy, number:31});
    this.position = 1500;
}

Head.prototype.turn = function (position) {
    switch (position) {
        case 'left':
            this.position = 90;
            break;
        case 'right':
            this.position = -90;
            break;
        case 'face':
            this.position = 0;
            break;
        default:
            this.position = position;
            break;
    }
    this.servo.goto(this.position);
}