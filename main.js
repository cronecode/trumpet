var trumpet = require('./trumpet')

trumpet.parse('./sample.txt')
var noise = trumpet.fill(10)
console.log(noise)