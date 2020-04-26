var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var dataUtil = require("./data_util");
var _ = require("underscore");

var app = express();
var PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' , extname: 'handlebars'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var hbs = exphbs.create({});

hbs.handlebars.registerHelper('listWithSpace', function (value) {
  return value.join(', ');
});
hbs.handlebars.registerHelper('loud', function (aString) {
    return aString.toUpperCase()
});

hbs.handlebars.registerHelper("printItems", function(items) {


  // var input, filter, ul, li, a, i, txtValue;
  //  ul = document.getElementById("myUL");
  //  li = ul.getElementsByTagName("li");
  //

  items.forEach(function(entry) {
      return entry;
  });

});

var _DATA = dataUtil.loadData().shows;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 function search(){
 //	input = document.getElementById("myInput");
  var names = [];
  var x = 0;
  _.each(_DATA, function(i) {
    names[x] = i.title;
    x++;
  })
  return names
 }

app.get('/',function(req,res){
  var tags = dataUtil.getAllTags(_DATA);
  var name = "All Shows";
  var searches = search();
  res.render('home', {
    search: searches,
    name: name,
    data: _DATA,
    genre: tags,
    create: true
  });
    })

app.get("/api/addShow", function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
    res.render('create') ,{
      genre: tags};
});

app.get('/api/getShows', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var name = "All Shows";

  res.render('home', {
    name: name,
    data: _DATA,
    genre: tags
  });
});

app.get('/api/oldest', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);

  var contents = [];
  var year = 4000;
  _.each(_DATA, function(i) {
      if(i.release < year){
        year = i.release;
      contents = i;
      }
  })
  var name = "Oldest Show";

  res.render('home', {
    name: name,
    data: [contents],
    genre: tags
  });

});


app.get('/api/getShows/:show', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var _type = req.params.show;
  var string = _type.split("").join(" ")
  var contents = [];
  var result =   _.filter(_DATA, function(chr) {
    return chr.title.includes(string) ;
  });
  let i = 0;
  if(result){
    let i = 0;
    while(i < result.length){
    contents[i] = result[i];
    i++
  }
}
  res.render('home', {
    name: string,
    data: contents,
    genre: tags
  });

});

app.get('/api/genre/:genre_type', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var _type = req.params.genre_type;
  var contents = [];
  var result =   _.filter(_DATA, function(chr) {
    return chr.genre.includes(_type) ;
  });
  let i = 0;
  if(result){
    let i = 0;
    while(i < result.length){
    contents[i] = result[i];
    i++
  }
}
upper = _type.charAt(0).toUpperCase();
lower = upper +_type.slice(1, _type.length);
  res.render('home', {
    name: lower+" Shows",
    data: contents,
    genre: tags
  });

});
function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

app.get('/api/alphabetical', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var contents = [];
  var letter = "";
  var letters = [];
  _DATA.sort(function(a, b) {
    return compareStrings(a.title, b.title);
  })
var x = 0;
var y = 0;
  _.each(_DATA, function(i) {
    if(letter != i.title.charAt(0)){
      letter = i.title.charAt(0);
    }
    letters[y] = letter;
    for(var z = 0; z < y; z++){
      if(letters[z] === letters[y] && z != y){
        letters[y] = " ";
      }
    }
      y++;
      contents[x]=  i;
      x++;
  })
  res.render('home', {
    letters: letters,
    name: "Alphabetical",
    data: contents,
    genre: tags
  });
});

app.get('/api/largest', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var contents = "";
  var num = 0;
  _.each(_DATA, function(i) {
      if(i.season > num){
        num = i.season;
        contents = i;
      }
  })
  res.render('home', {
    name: "TV Show with the Largest Number of Seasons",
    data: [contents],
    genre: tags
  });});

function getRandom() {
  var x = document.getElementById("demo")
  x.innerHTML = Math.floor((Math.random() * 4) + 1);
}

app.get('/api/random', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var contents = [];
  var num = _DATA[(Math.floor((Math.random() * _DATA.length) + 1))-1];
  contents[0] = num;
  res.render('home', {
    name: "Random TV Show",
    data: contents,
    genre: tags
});
});

app.post('/api/addShow', function(req, res) {
    var body = req.body;
    body.genre = body.genre.split(" ");
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
