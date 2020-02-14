var assert = require('assert');

/* FUNCTIONS */
var functions = require('../index');

var applyFunToArray = functions.applyFunToArray;

function upperArr(arr){
    var newArr = []
    for (var i = 0; i < arr.length; i ++){
        newArr[i] = arr[i].toUpperCase();
    }
    return newArr;
}

function lowerArr(arr){
    var newArr = []
    for (var i = 0; i < arr.length; i ++){
        newArr[i] = arr[i].toLowerCase();
    }
    return newArr;
}

describe('applyFunToArray', function() {
  var str = 'hEllo, woRld';
  it('testing upper case func', function() {
      assert.deepEqual(['HELLO','WORLD'], applyFunToArray(str, upperArr));
  });
  it('testing lower case func', function() {
      assert.deepEqual(['hello','world'], applyFunToArray(str, lowerArr));
  });
});


describe('applyFunToArray1', function() {
  var str = 'hello, world, hi, yes';
  it('testing upper case func', function() {
      assert.deepEqual(['HELLO', 'WORLD', 'HI', 'YES'], applyFunToArray(str, upperArr));
  });
  it('testing lower case func', function() {
      assert.deepEqual(['hello', 'world', 'hi', 'yes'], applyFunToArray(str, lowerArr));
  });
});
