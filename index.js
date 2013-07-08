var nomoco = exports;

exports.Hexy  = require('./lib/Hexy');
exports.Servo = require('./lib/Servo');

exports.init = function(options) {
    var hexy = new nomoco.Hexy(options);
    
    return hexy;
};