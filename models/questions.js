const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const QuestionSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    meta_tags: Array,
    difficulty: Number,
    questions: Array
})

module.exports = mongoose.model('Question', QuestionSchema)