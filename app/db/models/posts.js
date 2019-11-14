const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date,
    content: String
});

const Model = mongoose.model('Article', Schema);

module.exports = Model;
