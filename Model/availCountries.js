const mongoose = require('mongoose');

const { Schema } = mongoose;

const AvailCountries = new Schema({
    country: String,
    status: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('TrackCode', AvailCountries);