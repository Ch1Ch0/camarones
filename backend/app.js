const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

var path = require("path");

token = express();
email = express();

token = "";
email = "";
user_id = "";

const app = express();
app.use(express.static("public"));

mongoose.connect('mongodb+srv://simple:veXaYrLo7KCTE7nw@cluster0-5fncu.mongodb.net/viajelo?retryWrites=true')
.then(() => {
  console.log('Connected to DataBase');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);

const router = express.Router();

//app.get('/', (req, res) => res.send('Hello World homiiiee!'))
//app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, '../', 'index.html'));
//});

module.exports = app;
