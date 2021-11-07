const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authentication = require('./middleware/authentication');

//connnect to the db server -> mongodb
mongoose.connect(config.mongodb.connection_url, config.mongodb.options, (err) => {
    if (err) console.error(err.message);
    else {
        console.log('connected to the database!');
    }
});

var app = express();

//middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authentication)
app.use('/training', require('./routes/traning'));
app.use('/apprentice', require('./routes/apprentice'));
app.use('/muscles', require('./routes/muscles'));
// start the server
app.listen(config.port, () => {
    console.log(`app listening at port ${config.port}!`);
});