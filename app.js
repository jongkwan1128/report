/**
 * Created by 김종관 on 2018-03-28.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config = require('./config/config');


// autoIncrement.initialize(mongoose.connect(config.db));

mongoose.connect(config.db);
mongoose.connection.on('error', function () {
	console.log('DB Connection Error.');
});
mongoose.connection.once('open', function () {
	console.log(config.db + ' connected.');
	autoIncrement.initialize(mongoose);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use('/', require('./server/static'));

app.use('/login', require('./server/api/login/loginCtrl'));
app.use('/logout', require('./server/api/logout/logoutCtrl'));

app.use('/user', require('./server/api/user/userCtrl'));

app.use('/department', require('./server/api/department/departmentCtrl'));
app.use('/team', require('./server/api/team/teamCtrl'));
// app.use('/project', require('./server/api/project/projectCtrl'));


app.listen(4000, function () {
	console.log('Server On Port 4000');
});