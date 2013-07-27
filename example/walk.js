var hexy = require('../')();
var async = require('async');

var deg = 25;
var midFloor = 30;
var hipSwing = 25;
var pause = 0.5;

hexy.on('ready', function(){
  // Some instructions...
  async.timesSeries(5, function (n, next){
    // 1st step
    hexy.LF.replantFoot(deg-hipSwing,stepTime=0.5);
    hexy.RM.replantFoot(hipSwing,stepTime=0.5);
    hexy.LB.replantFoot(-deg-hipSwing,stepTime=0.5);

    hexy.RF.hip.position = -deg-hipSwing;
    hexy.LM.hip.position = hipSwing;
    hexy.RB.hip.position = deg-hipSwing;
    
    // 2nd step
    setTimeout(function(){
      hexy.RF.replantFoot(-deg+hipSwing,stepTime=0.5);
      hexy.LM.replantFoot(-hipSwing,stepTime=0.5);
      hexy.RB.replantFoot(deg+hipSwing,stepTime=0.5);
  
      hexy.LF.hip.position = deg+hipSwing;
      hexy.RM.hip.position = -hipSwing;
      hexy.LB.hip.position = -deg+hipSwing;
      next();
    }, 600);
  
  }, function(){
    console.log('Finish !!!');
  })
});
