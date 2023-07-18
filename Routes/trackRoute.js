const route = require('express').Router();
const nodemailer = require('nodemailer');

const TrackModel = require('../Model/trackModel');


route.post('/data', async (req, res) => {
    const data = req.body;
    const { email, name, phone, address, amount, seat, flyfrom, dest, date} = data;
    
    // Generate tracking code
    const num = Math.floor(Math.random() * 1000000);
    const trackCode = `EMEAWYS${num}`;

    const trackDoc = new TrackModel({
        name,
        email,
        phone,
        address,
        amount,
        seat,
        flyfrom,
        dest,
        date,
        trackCode,
    });
    trackDoc.save();

    return res.status(200).json({
        msg: 'Success',
    });


});

route.get('/track-data', async (req, res) => {
    const data = await TrackModel.findOne({ trackCode: req.body.trackCode });

    return res.status(200).json({
        data,
    });
});

module.exports = route;