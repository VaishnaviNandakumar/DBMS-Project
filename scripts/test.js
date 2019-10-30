require('../models/db');
const mongoose = require('mongoose');
const Question = require('../models/questions.js');

(async function () {
    var readQuiz = await Question.find({});

    var titles = [];
    for (var i = 0; i < readQuiz.length; i++) {
        titles[i] = readQuiz[i]["title"];
    }
    console.log(titles);
    mongoose.disconnect();
})();
