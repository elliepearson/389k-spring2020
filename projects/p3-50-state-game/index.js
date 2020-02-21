// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];

// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}
// 605369c610dcbb67aebd4c5e5de819019b23fed6
var included = [];
var count = 0;
/*
 * The majority of this project is done in JavaScript.
 *
 * 1. Start the timer when the click button is hit. Also, you must worry about
 *    how it will decrement (hint: setInterval).
 * 2. Check the input text with the group of states that has not already been
 *    entered. Note that this should only work if the game is currently in
 * 3. Realize when the user has entered all of the states, and let him/her know
 *    that he/she has won (also must handle the lose scenario). The timer must
 *    be stopped as well.
 *

 * There may be other tasks that must be completed, and everyone's implementation
 * will be different. Make sure you Google! We urge you to post in Piazza if
 * you are stuck.
 */
 //https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:*&LAN=625
//  var j = $.getJSON("https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:*&LAN=625", function(data){
// alert(data);
// });
// var data = $.ajax({
//   url: "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:*&LAN=625",
//   context: document.body
// }).done(function() {
//   $( this ).addClass( "done" );
// });

// alert(j);
function spanish(s){
    $("#" + s).hover(
      function() {
        //console.log('data');
           $.get("https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:*&LAN=625", function(data) {
             var key = Object.keys(abvMap).find(i => abvMap[i] === s);
             var index = Object.keys(abvMap).indexOf(key) +1;
             var number = data[index][0];
             var newStrin = commas(number);
             alert(key + ": "+ newStrin);
          });
        },
        // ,
    function(event){
      event.stopPropagation();

  });

  };



  function commas(num)
    {
      var num_parts = num.split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }




 function startTimer(duration, display) {
    var timeleft = duration;
      var downloadTimer = setInterval(function(){
        if(timeleft < 10){
          document.getElementById("timer").textContent = "00:0" + timeleft;

        }
        else{
          document.getElementById("timer").textContent = "00:" + timeleft;
        }
        timeleft--;
        if(count == Object.keys(abvMap).length && timeleft > 0){
          clearInterval(downloadTimer);
          win();
        }
      if(timeleft < 0){
        clearInterval(downloadTimer);
        lose();
      }
      },1000);

    document.getElementById("start").disabled = true;

}
function win(){
  var win = document.createElement("h1");
  win.innerHTML = "YOU WIN!";
  document.getElementById("list").appendChild(win);
}

function lose(){
  var score = document.createElement("h3");
//  Object.keys(abvMap).length
  score.innerHTML = count + "/" + states.length;
  document.getElementById("list").appendChild(score);
  var lost = document.createElement("p");
  lost.innerHTML = "States you did not get:";

  document.getElementById("list").appendChild(lost);

  document.getElementById("states").disabled = true;
  document.getElementById("start").disabled = false;

  // var keys = Object.keys(abvMap);
  // for(i = 0; i < keys.length; i++){
    for(i = 0; i < states.length; i++){
    if(!included.includes(states[i])){
      var lostStates = document.createElement("p");
      lostStates.innerHTML = states[i];
      lostStates.id = abvMap[states[i]];
      //lostStates.id = states[i];

      document.getElementById("list").appendChild(lostStates);
      spanish(abvMap[states[i]]);
      //spanish(states[i]);

  }
  }
}

 function unDisable() {
   document.getElementById("states").disabled = false;
   display = document.querySelector('#timer');
   startTimer(20, display);

 }

 function fixText(element){
   var capital = element.charAt(0);
   capital = capital.toUpperCase();
   var lower = element.slice(1, element.length);
   lower = lower.toLowerCase();
   return capital+lower;
 }

 function checkInput(){
   var x = document.getElementById("states").value;
   var stringArray = x.split(" ");
   var newString = "";
   for(i = 0; i < stringArray.length; i++){
       newString += fixText(stringArray[i]) + " ";
   }
   newString = newString.trim();
  // if(newString in abvMap){
  if(states.includes(newString)){
    if(!included.includes(newString)){
      included.push(newString);
      var para = document.createElement("div");
      para.innerHTML = newString;
      para.id = abvMap[newString];

      //para.id = newString;

      document.getElementById("list").appendChild(para);
      //spanish(abvMap[newString]);
      spanish(abvMap[newString]);

      count+=1;
  }
    clear();
  }


 }

 function clear(){
   document.getElementById('states').value='';

 }
