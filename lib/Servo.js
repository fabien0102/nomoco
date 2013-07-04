var EventEmitter = require('events').EventEmitter;
var util         = require('util');
var serial       = require('serialport');

module.exports = Servo;
util.inherits(Servo, EventEmitter);

function Servo(options){

}