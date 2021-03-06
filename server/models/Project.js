const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const ProjectSchema = new Schema({
    projectNum: {
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
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
autoIncrement.initialize(mongoose.connection);
ProjectSchema.plugin(autoIncrement.plugin, { model: 'Projects', field: 'id', startAt: 1});