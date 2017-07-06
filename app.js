const express = require('express');
const routes = require('./router');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(session({
  secret: 'quinton',
  resave: false,
  saveUninitialized: true
}));

routes(app);

// app.get("/", (req, res)=>{
//   res.render('index', {});
// });

app.listen(3000, (req, res)=>{
  console.log("hangman");
});
