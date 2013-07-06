var EventEmitter = require('events').EventEmitter;
var util = require('util');
var serialport = require('serialport');
var log = require('node-logging');

module.exports = Hexy;
util.inherits(Hexy, EventEmitter);

/**
 * Hexy constructor
 * Connect to the serialport and bind
 *
 * Options :
 *  - baudrate (default: 9600) Need change for bluetooth connection (115200)
 **/
function Hexy(options) {
    // Inherit EventEmitter
    EventEmitter.call(this);

    // Options
    options = options || {};
    this.baudrate = options.baudrate || 9600;

    // Auto connect
    var self = this;
    this.detect(function (err, serial) {
        if (err) {
            throw new Error(err);
        } else {
            self.serial = serial;
        }
    });
}

Hexy.prototype.detect = function (callback) {
    log.inf('Attempting to find Hexy ...')
    var self = this;
    var found = false,
        err = null,
        temp;

    // List & test serials ports availables
    serialport.list(function (err, ports) {

    ports.forEach(function (port) {
            log.dbg('[' + port.comName + '] try' );
            temp = new serialport.SerialPort(
                port.comName, {
                baudrate: self.baudrate,
                parser: serialport.parsers.readline('\n')
            });
            temp.on('open', function () {
                log.dbg('[' + port.comName + '] open' );
                // Send a ping
                temp.write('V\n');

                // Receive a pong ?
                temp.on('data', function (data) {
                    log.dbg('[' + port.comName + '] data' );
                    if (/SERVOTOR/i.test(data.toString())) {
                        found = temp;
                        log.inf('Hexy is connected on ' + port.comName);
                        callback(err, found);
                    } else {
                        err = new Error('Could not find Hexy');
                        callback(err, found);
                    }
                });
            });
        });
    });    
}