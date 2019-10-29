const mongoose = require('mongoose');
require('../models/db');
const allQuizzes = require('../data/allQuizzes.json');
const Question = require('../models/questions');

async function addQuestions() {
    await Question.insertMany(allQuizzes);
    mongoose.disconnect();
}

addQuestions();

/*
To add questions again, you need to drop the database first
On your terminal, type:

mongo
use QuizDB
db.questions.drop()

to drop the DB
then run the script 'npm run addQuestions' to add the questions again.
*/
