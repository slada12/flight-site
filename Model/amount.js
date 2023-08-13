const mongoose = require('mongoose');

const { Schema } = mongoose;

const Amount = new Schema({
    amount: Number,
});

module.exports = mongoose.model('Amount', Amount);