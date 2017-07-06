
const Words = require('../models/words');
const session = require('express-session');
const bodyParser = require('body-parser');

var theAnswer = Words.theAnswer;
console.log("this is the answer ", theAnswer);
var letters = Words.letters;
var context = {
  letters: ['']
  , theAnswer: ['']
  , guessed: []
  , numGuesses: 8
  , message: 'Good Luck'
  , messageResult: ''
  , playAgain: ''
  , alreadyGuessed: ''
  , random : Words.random
};

module.exports = {
  startGame: (req, res, next)=>{
    req.session.random = context.random;
    context.letters = context.letters.concat(letters)
    context.letters.shift();
    context.letters.toString().replace(',',' ')
    console.log(context.letters);
    context.theAnswer = context.theAnswer.concat(theAnswer)
    context.theAnswer.shift();

    console.log(context.theAnswer);
    req.session.theAnswer = context.theAnswer;
    req.session.word = context.letters;

    res.render('index', context);
  },

  guessedLetters: function(req, res){
    context.message = '';
    const guess = req.body.guess.toLowerCase();
    for (var i = 0; i < context.theAnswer.length; i++) {
      if (guess === context.theAnswer[i]) {

        console.log("blanks ", context.letters[i]);
        console.log("New Answer    ", context.theAnswer[i]);
        context.alreadyGuessed = ''
        context.letters[i] = context.theAnswer[i];
        console.log("correct ", context.letters[i]);
        req.session.word = context.letters;
        console.log("the context   ", context);
      }
    }

    if(!context.theAnswer.includes(guess) ){
      context.numGuesses--;
      context.alreadyGuessed = ''
      req.session.numGuesses = context.numGuesses;
      console.log("Wrong answer    ", context);
    }

    if(context.guessed.includes(guess) && !context.theAnswer.includes(guess)){
      context.numGuesses++;
      context.alreadyGuessed = "You already picked " + guess + " choose again"
      req.session.numGuesses = context.numGuesses;
      console.log(context);
    } else if (context.guessed.includes(guess) || context.theAnswer.includes(guess)){
      context.alreadyGuessed = "You already picked " + guess + " choose again";
    }
    if (!context.guessed.includes(guess)) {
      context.guessed.push(guess);
      context.alreadyGuessed = ''
      req.session.guessed = context.guessed;
      console.log(context);
    }

    if (!context.letters.includes('__')){
      context.messageResult = "YOU WIN!!!";
      context.playAgain = 'Want to play again?'
    }

    if(context.numGuesses < 1){
      context.messageResult = "Sorry you Lose. Your word was " + context.random + ".";
      context.playAgain = 'Want to play again?'
    }
    res.render('index', context);
  },


  restart: (req, res, next)=>{

    delete req.session.guessed
    delete req.session.letters
    delete req.session.word
    delete req.session.theAnswer
    delete req.session.numGuesses
    delete req.session.random
    context.letters=[''];
    context.theAnswer=[''];
    context.guessed=[];
    context.numGuesses=8;
    context.message='Good Luck';
    context.messageResult='';
    context.playAgain='';
    context.alreadyGuessed='';
    context.random =Words.random;
    res.redirect('/');
  }





};
