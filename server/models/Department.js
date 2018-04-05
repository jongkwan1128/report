const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const DepartmentSchema = new Schema({
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
autoIncrement.initialize(mongoose.connection);
DepartmentSchema.plugin(autoIncrement.plugin, { model: 'Departments', field: 'id', startAt: 1});