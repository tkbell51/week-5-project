const Words = require('./models/words');
const hangmanController = require('./controller/hangmanController');
const session = require('express-session');
const express = require('express');

const app = express();

app.use(session({
  secret : 'secretword',
  resave : false,
  saveUninitialized : true
}));



module.exports = {
//   randomMiddleware: (req, res, next)=>{
//     if(!req.session.){
//       req.session.theRandom = Words.random;
//     }
//   }
};
