//new Date().getTime()
var moment=require('moment');

var time=moment();
// console.log(date.getMonth());

var someTimestamp=moment().valueOf();
console.log(someTimestamp)
var createdAt=1234;
var date=moment(createdAt);
console.log(time.format('hh:mm:ss a'));
//console.log(date.format('MMM YYYY Do'));

//var date=moment();
