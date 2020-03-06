var operations = require("./operations");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});
app.get('/factorial', function(req, res) {
    var number = req.query.number;
    if(!number) {
      return res.send("Please send a number");
    }
    number = parseInt(number);
    res.send(operations.factorial(number) + "");
});

app.get('/square', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.square(number) + "");
});

app.get('/sqroot', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.sqroot(number) + "");
});

app.listen(3000, function () {
  console.log('Server running on port 3000!')
})
