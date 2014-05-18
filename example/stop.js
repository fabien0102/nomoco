var hexy = require('../')();

hexy.on('ready', function(){
  hexy.stop();
  console.log("Keep calm ;)");
});
