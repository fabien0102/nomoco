/*
var async = require('async');
var err = {found: false};
var timeOutId;

console.log(err);
async.eachSeries([1, 2, 3], function (item, callback) {
    console.log(item);
    timeOutId = setTimeout(function(){
        console.log('callback');
        err.found = true;
        callback(err);
    }, 500);
    //clearTimeout(timeOutId);
    //callback(null, true);
}, function (found) {
    console.log(found);
    if (found) {
        console.log('found !');
    } else {
        console.log('not found');
    }
});

*/


var a = require('../')();