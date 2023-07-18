const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrackModel = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    amount: String,
    seat: String,
    flyfrom: String,
    dest: String,
    date: String,
    trackCode: String,
});

module.exports = mongoose.model('TrackCode', TrackModel);