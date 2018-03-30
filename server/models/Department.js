const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    depNum: {
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
    }
});

module.exports = mongoose.model('Department', DepartmentSchema);