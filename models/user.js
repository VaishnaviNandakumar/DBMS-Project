const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true,
    },
    user_correct: Number,
    user_total: Number,
});

module.exports = mongoose.model('User', userSchema);
