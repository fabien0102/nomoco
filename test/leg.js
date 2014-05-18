var should = require('should');
var Leg = require('../lib/leg');
var ComMock = require('./mock/comMock');

Math.degrees = function (radians) {
  return radians * (180 / Math.PI);
};

Math.radians = function (degrees) {
  return degrees * (Math.PI / 180);
};

describe('Leg', function(){
  var com, leg;

  beforeEach(function(){
    com = new ComMock();
  });

  describe('LF', function(){

    beforeEach(function(){
      leg = new Leg(com, 7, 6, 5, -65.8, 76.3, -2.2829);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(-110,87,-85);
        (leg.hip.position).should.equal(36);
        (leg.knee.position).should.equal(46);
        (leg.ankle.position).should.equal(-61);
      });
    });
  });

  describe('LM', function(){

    beforeEach(function(){
      leg = new Leg(com, 11, 10, 9, -103.3, 0, 0, true);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(-150,23,-85);
        (leg.hip.position).should.equal(-26);
        (leg.knee.position).should.equal(44);
        (leg.ankle.position).should.equal(-57);
      });
    });
  });

  describe('LB', function(){

    beforeEach(function(){
      leg = new Leg(com, 15, 14, 13, -65.8, -76.3, 2.2829);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(-110,-133,-85);
        (leg.hip.position).should.equal(3);
        (leg.knee.position).should.equal(44);
        (leg.ankle.position).should.equal(-34);
      });
    });
  });

  describe('RF', function(){

    beforeEach(function(){
      leg = new Leg(com, 24, 25, 26, 65.8, 76.6, -0.8587);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(87,110,-85);
        (leg.hip.position).should.equal(8);
        (leg.knee.position).should.equal(48);
        (leg.ankle.position).should.equal(-63);
      });
    });
  });

  describe('RM', function(){

    beforeEach(function(){
      leg = new Leg(com, 20, 21, 22, 103.3, 0, 0);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(150,-23,-85);
        (leg.hip.position).should.equal(-26);
        (leg.knee.position).should.equal(44);
        (leg.ankle.position).should.equal(-57);
      });
    });
  });

  describe('RB', function(){

    beforeEach(function(){
      leg = new Leg(com, 16, 17, 18, 65.8, -76.6, 0.8587);
    });

    describe('ikFullLeg', function(){
      it('should have the right position', function(){
        leg.ikFullLeg(110,-87,-85);
        (leg.hip.position).should.equal(36);
        (leg.knee.position).should.equal(46);
        (leg.ankle.position).should.equal(-61);
      });
    });
  });
});
