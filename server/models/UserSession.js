/**
 * Created by 김종관 on 2018-03-28.
 */
const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
	userId: {
		type: String,
		default: ''
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('UserSessionr', UserSessionSchema);