const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Database Connection
(async function () {
    try {
      mongoose.connect(process.env.dbConnection);
    } catch (error) {
      console.log(chalk.red('The Database did not Connect!!!'));
    }
  
    console.log('Connecting...');
  
    mongoose.connection.once('open', () => {
      console.log('Connection Succesfully Established Connection');
    });
}());


const app = express();
const trackRoute = require('./Routes/trackRoute');
// const devRoute = require('./Routes/devRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    mode: "no-cors"
  }));


app.use('/api/', trackRoute);
// app.use('/api/dev', devRoute);

app.get('/', (req, res) => {
  res.send('The App is Working');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
