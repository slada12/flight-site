const route = require('express').Router();
const nodemailer = require('nodemailer');

const TrackModel = require('../Model/trackModel');
const AvailCountries = require('../Model/availCountries');
const Amount = require('../Model/amount');


const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.user,
      pass: process.env.pass,
    }
  });


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

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Emerald Airways" <info@emeraldairways.co>', // sender address
          to: `${email}`, // list of receivers
          subject: "YOUR FLIGHT HAS BEEN BOOKED", // Subject line
        //   text: "Hello world?", // plain text body
          html: `
            <b>Hello ${name},</b>
            <p>Your Flight has been successfully booked</p>
            <p>We expect your reply in the next 24 hours</p>
            <p>Your booking number is: ${trackCode}</p>
            <p>Track your booking on our website</p>
            <p>Thanks for trusting us</p>
          `, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
      }
      
      main().catch(console.error);

    return res.status(200).json({
        msg: 'Success',
    });


});

route.post('/track-data', async (req, res) => {
    const data = await TrackModel.findOne({ trackCode: req.body.trackCode });

    console.log('Data fetched. Ready to display');
    console.log(data);
    return res.status(200).json({
        data,
    });
});

route.post('/edit', async (req, res) => {
    const user = await TrackModel.findOne({ trackCode: req.body.trackCode });
    console.log(req.body.trackCode);
    const check = req.body.check;

    if (check === true) {
        const availCountries = await AvailCountries.findOneAndUpdate({ country: 'US'}, {
            status: true,
        });

        availCountries.save();
    } else {
        const availCountries = await AvailCountries.findOneAndUpdate({ country: 'US'}, {
            status: false,
        });

        availCountries.save();
    }

    const data = await TrackModel.findOneAndUpdate({ trackCode: req.body.trackCode }, {
        status: req.body.status,
        mode: req.body.mode,
    });

    data.save();

    return res.status(200).json({
        msg: 'sucess',
    });
});

route.get('/country', async (req, res) => {
    const country = await AvailCountries.findOne({ country: 'US'});

    return res.status(200).json({
        msg: country,
    });
});

route.post('/add-country', async (req, res) => {
    const country = new AvailCountries({
        country: req.body.country,
    });

    country.save();

    return res.status(200).json({
        msg: 'Success',
    });
});

route.post('/amount', async (req, res) => {
    const oldamount = await Amount.deleteMany();

    const amount = new Amount({
        amount: req.body.amount,
    });

    amount.save();

    return res.status(200).json({
        msg: 'Success',
    });
});

route.get('/amount', async (req, res) => {
    const amount = await Amount.find();

    return res.status(200).json({
        msg: amount[0],
    });
});

module.exports = route;