const hangmanController = require('./controller/hangmanController');
const helpers = require('./helpers');

module.exports = function(app){
  app.get('/', hangmanController.startGame);
  app.post('/guess', hangmanController.guessedLetters);
  app.post('/', hangmanController.restart);


};
