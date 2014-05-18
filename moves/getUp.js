/**
 * Make the Hexy stand up !
 *
 * @method Hexy.moves.standUp()
 */
module.exports = function standUp (hexy, async) {
  async.series([
    function setHips (next){
      hexy.RF.hip.position = -30;
      hexy.RM.hip.position = 1;
      hexy.RB.hip.position = 30;

      hexy.LF.hip.position = 30;
      hexy.LM.hip.position = 1;
      hexy.LB.hip.position = -30;
      setTimeout(next, 500);
    },

    function setKnees (next){
      for(var leg in hexy.legs) hexy.legs[leg].knee.position = -30;
      setTimeout(next, 500);
    },

    function setAnkle (next){
      for(var leg in hexy.legs) hexy.legs[leg].ankle.position = -90;
        setTimeout(next,500);
    },

    function standUp (next){
      async.timesSeries(48/3, function(n, nextTime){
        for(var leg in hexy.legs){
          hexy.legs[leg].knee.position = (n * 3);
          hexy.legs[leg].ankle.position = -90 + (n * 3);
        }
        setTimeout(nextTime, 100);
      },function(){
        next();
      });
    }

    ],function(){
      hexy.stop();
    }
  );
};
