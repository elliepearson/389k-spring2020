var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var dotenv = require('dotenv');
var TVShow = require('./models/TVShow');
var _ = require("underscore");

// Load envirorment variables
dotenv.config();
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' , extname: 'handlebars'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var hbs = exphbs.create({});
hbs.handlebars.registerHelper('listWithSpace', function (value) {
  return value.join(', ');
});

//  function getID(req, res) {
//    TVShow.find({}, function(err, shows){
//      if(err) throw err;
//       res.send(shows);
//    });
//   // return TVShow.find({});
// };

ids = {};

app.get('/',function(req,res){
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;
    res.render('home', {
      name: "Home",
      create: true,
      data: ids
    });
    //res.send(shows);

  });

  })

app.get('/show/getShows', function(req, res) {
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;

    res.render('home', {
      name: "All TV Shows",
      create: true,
      data: ids
    });
  //  res.send(shows);
  });

});


app.get('/show/genre/:genre_type', function(req, res) {
  TVShow.find({genre: req.params.genre_type}, function(err, shows){
    if(err) throw err;
    res.render('home', {
      name: req.params.genre_type,
      create: true,
      data: ids
    });

    });

});

app.get('/show/year/:year', function(req, res) {
  TVShow.find({year: req.params.year}, function(err, shows){
    if(err) throw err;
    res.render('home', {
      name: req.params.year,
      create: true,
      data: ids
    });
    });

});

console.log(ids);
app.get('/show/:id/reviews', function(req, res) {
  TVShow.findById(req.params.id, 'reviews', function(err, shows){
    if(err) throw err;
    res.render('shows', {
      reviews: shows.reviews,
      id: req.params.id,
      name: "Reviews",
      create: true,
      data: ids
    });
     //res.send(shows);
    });


});

app.get('/show/addShow', function(req, res) {
  TVShow.find({}, 'reviews', function(err, shows){
    if(err) throw err;
    res.render('create', {
      name: "Add Show",
      create: true,
      data: ids
    });

    });
  //res.render('create');


});

app.get("/show/:id/newReview", function(req, res) {
  TVShow.findById(req.params.id, 'reviews', function(err, shows){
    res.render('review') ,{
      id: req.params.id
    };
    //res.send(req.params.id)
    });
});

app.post('/show/addShow', function(req, res) {
  var tv = new TVShow({
      title: req.body.title,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      reviews: []
  });

  // Save movie to database
  tv.save(function(err) {
      if (err) throw err;
      return res.send('Succesfully inserted show.');
  });

  res.render('create', {
    name: "Add Show",
    create: true,
    data: ids,
  });

  res.redirect("/");

});

app.post('/show/:id/newReview', function(req, res) {
  TVShow.findOne({_id: req.params.id}, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    // 2. creating the review schema
    show.reviews.push({
      rating: parseFloat(req.body.rating),
      comment: req.body.comment,
      author: req.body.author
    });
    // saving updated movie
    show.save(function(err){
      if (err) throw err;
      res.send('Succesfully added review.')
    });
  });
});

app.delete('/show/:id', function(req, res) {
  TVShow.findByIdAndRemove(req.params.id, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    res.send('TV Show deleted');
  });
});


app.delete('/show/:id/review/delete', function(req, res) {
  TVShow.findOne({_id: req.params.id}, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    // 2. delete the review schema
    show.reviews.pop();
    // saving updated movie
    show.save(function(err){
      if (err) throw err;
      res.send('Succesfully deleted review.')
    });
  });
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
