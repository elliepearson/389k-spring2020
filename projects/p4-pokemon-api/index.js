var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pokeDataUtil = require("./poke-data-util");
var _ = require("underscore");
var app = express();
var PORT = 3000;

// Restore original data into poke.json.
// Leave this here if you want to restore the original dataset
// and reverse the edits you made.
// For example, if you add certain weaknesses to Squirtle, this
// will make sure Squirtle is reset back to its original state
// after you restard your server.
pokeDataUtil.restoreOriginalData();

// Load contents of poke.json into global variable.
var _DATA = pokeDataUtil.loadData().pokemon;

/// Setup body-parser. No need to touch this.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    // HINT:
    var contents = "";
    _.each(_DATA, function(i) {
      console.log(i);
        contents += '<tr><td>'+parseInt(i.id)+'</td><td><a href="/pokemon/' + parseInt(i.id) + '">'+ i.name + '</a></td></tr>\n';
    })
    var html = '<html>\n<body>\n<table>' + contents + '</table>\n</body>\n</html>';
    res.send(html);
});

app.get("/pokemon/:pokemon_id", function(req, res) {
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    var contents = "";
    // _.each(_DATA, function(i) {
    //     contents += `<tr><td>${i}</td><td>${JSON.stringify(result[i])}</td></tr>\n`;
    // })
    contents += `<tr><td>id</td><td>${JSON.stringify(result.id)}</td></tr>\n`
    contents += `<tr><td>num</td><td>${JSON.stringify(result.num)}</td></tr>\n`
    contents += `<tr><td>name</td><td>${JSON.stringify(result.name)}</td></tr>\n`
    contents += `<tr><td>img</td><td>${JSON.stringify(result.img)}</td></tr>\n`
    contents += `<tr><td>type</td><td>${JSON.stringify(result.type)}</td></tr>\n`
    contents += `<tr><td>height</td><td>${JSON.stringify(result.height)}</td></tr>\n`
    contents += `<tr><td>weight</td><td>${JSON.stringify(result.weight)}</td></tr>\n`
    contents += `<tr><td>candy</td><td>${JSON.stringify(result.candy)}</td></tr>\n`
    contents += `<tr><td>candy_count</td><td>${JSON.stringify(result.candy_count)}</td></tr>\n`
    contents += `<tr><td>egg</td><td>${JSON.stringify(result.egg)}</td></tr>\n`
    contents += `<tr><td>spawn_chance</td><td>${JSON.stringify(result.spawn_chance)}</td></tr>\n`
    contents += `<tr><td>avg_spawns</td><td>${JSON.stringify(result.avg_spawns)}</td></tr>\n`
    contents += `<tr><td>spawn_time</td><td>${JSON.stringify(result.spawn_time)}</td></tr>\n`
    contents += `<tr><td>multipliers</td><td>${JSON.stringify(result.multipliers)}</td></tr>\n`
    contents += `<tr><td>weaknesses</td><td>${JSON.stringify(result.weaknesses)}</td></tr>\n`
    contents += `<tr><td>prev_evolution</td><td>${JSON.stringify(result.prev_evolution)}</td></tr>\n`
    contents += `<tr><td>next_evolution</td><td>${JSON.stringify(result.next_evolution)}</td></tr>\n`


    var html = '<html>\n<body>\n<table>' + contents +  '</table>\n</body>\n</html>';

    res.send(html);

});

app.get("/pokemon/image/:pokemon_id", function(req, res) {
  var _id = parseInt(req.params.pokemon_id);
  var result = _.findWhere(_DATA, { id: _id })
  var contents = "";
  contents += `<img src = ${JSON.stringify(result.img)}>\n`

  var html = '<html>\n<body>\n' + contents +  '</body>\n</html>';

  res.send(html);


});

app.get("/api/id/:pokemon_id", function(req, res) {
    // This endpoint has been completed for you.
    var _id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, { id: _id })
    if (!result) return res.json({});
    res.json(result);
});

app.get("/api/evochain/:pokemon_name", function(req, res) {
  var _name = req.params.pokemon_name;
  var result = _.findWhere(_DATA, { name: _name });
console.log(result);
  var ret = [];
  if (!result){
    return res.json([]);
  }
  else{
    ret.push(result.name);
    if(result.hasOwnProperty('prev_evolution')){
      ret.push(result.prev_evolution[0].name);
    }
    if(result.hasOwnProperty('next_evolution')){
      ret.push(result.next_evolution[0].name);
    }
    ret.sort();
  }

  res.json(ret);

});

app.get("/api/type/:type", function(req, res) {
  var _type = req.params.type;

  var result =   _.filter(_DATA, function(chr) {
    return chr.type.includes(_type);
  });

  var ret = [];
  if (result){
    let i = 0;
    while(i < result.length){
      ret.push(result[i].name);
      i++;
    }

  } else{
    return res.json({});
  }
  res.json(ret);

});

app.get("/api/type/:type/heaviest", function(req, res) {
  var _type = req.params.type;

  var result =   _.filter(_DATA, function(chr) {
    return chr.type.includes(_type);
  });
  ret = {};
  if (result){
    let weight1 = 0;
    let name1;
    let i = 0;
    while(i < result.length){
      let w1 = result[i].weight.split(" ")
      let w = parseInt(w1[0]);
      if(weight1 < w){
        weight1 = w;
        name1 = result[i].name;
        ret = {name: name1, weight: weight1};
    }
    i++;

  }

}else{
    return res.json({});
  }
  res.json(ret);

});
//  pokeDataUtil.saveData(_DATA);
app.post("/api/weakness/:pokemon_name/add/:weakness_name", function(req, res) {
  var _name = req.params.pokemon_name;
  var _weak = req.params.weakness_name;
  var result = _.findWhere(_DATA, {name: _name });
  var ret = [];

  if(result){
    if(!result.weaknesses.includes(_weak)){
      result.weaknesses.push(_weak);
    }
    pokeDataUtil.saveData(_DATA);

    res.send({name: _name, weaknesses: result.weaknesses});
  }
  else{
    res.send({});
  }
});

app.delete("/api/weakness/:pokemon_name/remove/:weakness_name", function(req, res) {
  var _name = req.params.pokemon_name;
  var _weak = req.params.weakness_name;
  var result = _.findWhere(_DATA, {name: _name });
  var ret = [];
  // console.log(result);
  if(result){
    if(result.weaknesses.includes(_weak)){
      for(var i = 0; i < result.weaknesses.length; i++){
        if(result.weaknesses[i] === _weak){
            result.weaknesses.splice(i,1);
        }
      }
      pokeDataUtil.saveData(_DATA);

    }
    res.send({name: _name, weaknesses: result.weaknesses});
  }
  else{
    res.send({});
  }
});


// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

// DO NOT REMOVE (for testing purposes)
exports.PORT = PORT
