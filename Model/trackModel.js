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
    status: {
        type: Boolean,
        default: false,
    },
    mode: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('TrackCode', TrackModel);