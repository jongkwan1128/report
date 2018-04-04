const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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