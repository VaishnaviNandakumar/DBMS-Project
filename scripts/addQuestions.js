require('../models/db');
const allQuizzes = require('../data/allQuizzes.json');
const Question = require('../models/questions');

Question.insertMany(allQuizzes);
