/**
 * Created by 김종관 on 2018-03-28.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
	userId: {
		type: String,
		default: ''
	},
	timestamp: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('UserSessionr', UserSessionSchema);