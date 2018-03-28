/**
 * Created by 김종관 on 2018-03-28.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

// Set up Mongoose
mongoose.connect(config.db, function () {
	console.log(config.db + ' connected.');
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use('/', require('./server/static'));

app.use('/account', require('./server/api/account/accountContoller'));



app.listen(4000, function () {
	console.log('Server On Port 4000');
});