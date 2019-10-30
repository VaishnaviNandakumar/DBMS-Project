const mongoose = require('mongoose');
require('../models/db');
const users = require('../data/users.json');
const User = require('../models/user');

async function addUsers() {
    await User.insertMany(users);
    mongoose.disconnect();
}

addUsers();

/*
To add Users again, you need to drop the database first
On your terminal, type:

mongo
use QuizDB
db.users.drop()

to drop the DB
then run the script 'npm run addUsers' to add the Users again.
*/
