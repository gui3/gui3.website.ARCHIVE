const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    login: String,
    dateCreated: Date,
    mood: String
});

const Model = mongoose.model('Article', Schema);

module.exports = Model;
