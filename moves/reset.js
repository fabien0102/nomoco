/**
 * Reset position of the Hexy
 *
 * @method Hexy.moves.reset()
 */
 module.exports = function reset (hexy, async) {
  async.series([
    function(next){
      hexy.LF.replantFoot(-30,stepTime=0.3);
      hexy.RM.replantFoot(1,stepTime=0.3);
      hexy.LB.replantFoot(30,stepTime=0.3);

      setTimeout(next, 500);
    },

    function(next){
      hexy.RF.replantFoot(30,stepTime=0.3);
      hexy.LM.replantFoot(1,stepTime=0.3);
      hexy.RB.replantFoot(-30,stepTime=0.3);

      setTimeout(next, 500);
    },

    function(next){
      // Set all the hip angle to what they should be while standing
      hexy.LF.hip.position = -30;
      hexy.RM.hip.position = 1;
      hexy.LB.hip.position = 30;
      hexy.RF.hip.position = 30;
      hexy.LM.hip.position = 1;
      hexy.RB.hip.position = -30;

      setTimeout(next, 500);
    }

    ],function(){
      hexy.stop();
    }
  );
};
