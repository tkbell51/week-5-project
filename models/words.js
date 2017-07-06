const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

var randNum = Math.floor(Math.random() * (words.length));
var randWord = words[randNum];
var letters = randWord.split("");
var theAnswer = randWord.split("");

for (var i = 0; i < letters.length; i++) {
  letters[i] = '__';
}


module.exports = {
  data: words,
  random: randWord,
  letters: letters,
  theAnswer: theAnswer
};
console.log("here are the letters ", letters);
