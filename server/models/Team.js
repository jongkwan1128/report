const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
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
    depNum: {

    }
});

module.exports = mongoose.model('Department', DepartmentSchema);