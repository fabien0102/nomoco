module.exports = ComMock;

function ComMock(){
	this.history = [];
}

/**
 * Write method
 *
 * @param {String} value
 **/
ComMock.prototype.write = function(value){
	this.history.push(value);
},

/**
 * Read method
 *
 * @return {String} Last input
 **/
ComMock.prototype.read = function(){
	return this.history[this.history.length - 1];
}
