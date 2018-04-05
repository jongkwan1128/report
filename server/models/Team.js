const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const TeamSchema = new Schema({
    teamNum: {
        type: Number,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    department: {
        type: Schema.Types.ObjectId, ref: 'Department',
    }
});

module.exports = mongoose.model('Team', TeamSchema);
autoIncrement.initialize(mongoose.connection);
TeamSchema.plugin(autoIncrement.plugin, { model: 'Teams', field: 'id', startAt: 1});