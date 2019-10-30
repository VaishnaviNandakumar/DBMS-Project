'use strict';

require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const Question = require('./models/questions');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static('static'));

app.set('view engine', 'ejs');

app.get('/', async function(_req, res){
  res.render('homepage');
});

app.get('/home', async function (req, res) {
  var readQuiz = await Question.find({});
  console.log(readQuiz);

  var titles = [];
  for (var i = 0; i<readQuiz.length; i++) {
    titles[i] = readQuiz[i]["title"];
  }
  console.log(titles);
  res.render('index',{titles: titles});
});

app.get('/,/quiz', async function (req, res) {
  var readQuiz = await Question.find({});
  var titles = [];
  for (var i = 0; i<readQuiz.length; i++) {
    titles[i] = readQuiz[i]["title"];
  }
  res.send(JSON.stringify(titles));
});

app.post('/quiz', async function(req, res){
  var sentQuiz = req.body;
  var readQuiz = await Question.find({});
  if (readQuiz.length > 0) {
    sentQuiz["id"] = readQuiz[readQuiz.length-1]["id"] + 1;
  }
  readQuiz.push(sentQuiz);

  var jsonString = JSON.stringify(readQuiz);
  fs.writeFileS("data/allQuizzes.json", jsonString);

  res.send("updated");
});

app.get('/quiz/:id', async function (req, res) {
  var readQuiz = await Question.find({});
  var targetQuiz;;
  for (var i = 0; i < readQuiz.length; i++) {
    if (readQuiz[i]["id"] === parseInt(req.params.id)) {
      targetQuiz = readQuiz[i];
      break;
    }
  }
  res.send(targetQuiz);
});

app.put('/quiz/:id', async function (req, res) {
  var sentQuiz = req.body;
  var readQuiz = await Question.find({});
  for (var i = 0; i < readQuiz.length; i++) {
    if (readQuiz[i]["id"] === parseInt(req.params.id)) {
      readQuiz[i] = sentQuiz;
      break;
    }
  }

  var jsonString = JSON.stringify(readQuiz);
  fs.writeFile("data/allQuizzes.json", jsonString);

  res.send("updated");
});

app.delete('/quiz/:id', async function (req, res) {
  var readQuiz = await Question.find({});
  for (var i = 0; i < readQuiz.length; i++) {
    if (readQuiz[i]["id"] === parseInt(req.params.id)) {
      readQuiz.splice(i, 1);
      break;
    }
  }
  var jsonString = JSON.stringify(readQuiz);
  fs.writeFile("data/allQuizzes.json", jsonString);
  res.send("deleted");
});

app.get('/revert', async function (req, res) {
  var readIn = fs.readFileSync("data/allQuizzesRevert.json", 'utf8');
  fs.writeFile("data/allQuizzes.json", readIn);
  res.send("reverted");
});

app.get('/users', async function (req, res) {
  var readUsers = fs.readFileSync("data/users.json", 'utf8');
  res.send(readUsers);
});

app.post('/users', async function(req, res){
  var jsonString = JSON.stringify(req.body);
  fs.writeFileSync("data/users.json", jsonString);
  res.send(req.body);
});

app.get('/titles', async function (req, res) {
  var readQuiz = await Question.find({});
  var titles = "[";
  for (var i = 0; i<readQuiz.length; i++) {
    if (i < readQuiz.length -1)
      titles += "\"" + readQuiz[i]["title"] + "\"" + ", ";
    else
      titles += "\"" + readQuiz[i]["title"] + "\"";
  }
  titles += "]";
  res.send(titles);
});

app.get('/titlesandids', async function (req, res) {
  var readQuiz = await Question.find({});
  var titles = [];
  for (var i = 0; i<readQuiz.length; i++) {
    titles[i] = readQuiz[i]["title"];
    titles[readQuiz.length + i] = readQuiz[i]["id"];
  }
  res.send(JSON.stringify(titles));
});


var server = app.listen(process.env.PORT || 4000, async function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`app listening on port ${port}`, host, port);
});
