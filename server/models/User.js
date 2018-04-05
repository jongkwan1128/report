/**
 * Created by 김종관 on 2018-03-28.
 */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const UserSchema = new Schema({
    eNum: {
		type: Number,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	team: {
		type: Schema.Types.ObjectId, ref: 'Team'
	},
	projects: [
		{
			type: Schema.Types.ObjectId, ref: 'Project'
		}
	]
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, { model: 'Users', field: 'id', startAt: 1});