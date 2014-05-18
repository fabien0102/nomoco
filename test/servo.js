var should = require('should');
var Servo = require('../lib/servo');
var ComMock = require('./mock/comMock');

describe('Servo', function(){
	var com, servo;

	beforeEach(function(){
		com = new ComMock();
		servo = new Servo(com, 42);
	});

	describe('position', function(){
		it('should return -90', function(){
			servo.position = -90;
			(servo.position).should.equal(-90);
			(com.read()).should.equal("#42P500");
		});
		it('should return -45', function(){
			servo.position = -45;
			(servo.position).should.equal(-45);
			(com.read()).should.equal("#42P1000");
		});
		it('should return 0', function(){
			servo.position = 0;
			(servo.position).should.equal(0);
			(com.read()).should.equal("#42P1500");
		});
		it('should return 45', function(){
			servo.position = 45;
			(servo.position).should.equal(45);
			(com.read()).should.equal("#42P2000");
		});
		it('should return 90', function(){
			servo.position = 90;
			(servo.position).should.equal(90);
			(com.read()).should.equal("#42P2500");
		});
	});

	describe('kill', function(){
		it('should send the right commande', function(){
			servo.kill();
			(com.read()).should.equal("#42L");
		});
	});

	describe('killAll', function(){
		it('should send the right commande', function(){
			servo.killAll();
			(com.read()).should.equal("K");
		});
	});

	describe('senterAll', function(){
		it('should send the right commande', function(){
			servo.centerAll();
			(com.read()).should.equal("C");
		});
	});
});
