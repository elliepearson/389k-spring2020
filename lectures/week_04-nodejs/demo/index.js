var fs = require("fs");

var http = require("http");
const PORT = 8888;

function handleReq(req, res){
    console.log("New request at " + req.url);
    res.end("Link hit: " + req.url);
}

/* http.createServer() takes a function that takes in the request and response.
 */
var server = http.createServer(handleReq);

/* This "activates" our server.
 */
server.listen(8888, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

// var request = require('request');
// request('http://api.umd.io/v0/courses/CMSC132', function(error, response, body){
// 	if(!error && response.statusCode == 200){
// 		console.log(body);
// 	}
// });

// fs.writeFile('output.txt', 'This is so fun!', function(err, data){
// 	if(err){
// 		return console.error(err);
// 	}
// 	fs.readFile('output.txt', function(err, data){
// 		if(err){
// 			return console.error(err);
// 		}
// 		console.log("inside read: " + data.toString());
// 	})
// });
//
// fs.readFile('output.txt', function(err, data){
// 	if(err){
// 		return console.error(err);
// 	}
// 	console.log("outside read: " + data.toString());
// });
//fs.readFile('input.txt',function(err,data){
// if(err){
// 	return console.log(err);
// }
// console.log("Asynchronous read: " + data.toString());
// });
//
// var data = fs.readFileSync('input.txt');
// console.log("Synchonous read: " + data.toString());
//
// console.log("program ended");



// var http = require("http")
// const PORT = 8888;
//
// function handleReq(req, res) {
// 	console.log("New request at " + req.url)
// 	if (req.url === '/robert') {
// 		var robert = {
// 			age: 21,
// 			gender: 'male',
// 			majors: ['Computer Science']
// 		};
// 		res.end(JSON.stringify(robert));
// 	} else {
// 		res.end("link hit: " + req.url);
// 	}
// }
//
//
//
// var server = http.createServer(handleReq)
//
// server.listen(PORT, function() {
// 	console.log("Server is listening on: http://localhost:" + PORT);
// })
