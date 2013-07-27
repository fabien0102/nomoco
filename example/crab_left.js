var hexy = require('../')();
var async = require('async');

var s = 23; // Scale factor
var theta = Math.PI / 2; // Direction

hexy.on('ready', function(){
  // Some instructions...
  async.timesSeries(5, function (n, next){
    // 1st step
    hexy.globalOffset(0, 0, -14, 1);
    hexy.globalOffset(0, 0, 0, 2);
    
    // 2nd step
    setTimeout(function(){
      hexy.globalOffset(Math.sin(theta) * s, -Math.cos(theta) * S, 0, 1);
      hexy.globalOffset(-Math.sin(theta) * s, Math.cos(theta) * S, 0, 2);
    }, 200);

    // 3nd step
    setTimeout(function(){
      hexy.globalOffset(0, 0, 0, 1);
      hexy.globalOffset(0, 0, -14, 2);
    }, 400);

    // 4nd step
    setTimeout(function(){
      hexy.globalOffset(-Math.sin(theta) * s, Math.cos(theta) * S, 0, 1);
      hexy.globalOffset(Math.sin(theta) * s, -Math.cos(theta) * S, 0, 2);

      next();
    }, 600);
  
  }, function(){
    console.log('Finish !!!');
  })
});