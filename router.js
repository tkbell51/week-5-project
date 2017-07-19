const hangmanController = require('./controller/hangmanController');


module.exports = function(app){
  app.get('/', hangmanController.startGame);
  app.post('/guess', hangmanController.guessedLetters);
  app.post('/', hangmanController.restart);


};
