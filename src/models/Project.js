const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDesc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['progress', 'pending', 'done'],
        default: 'pending'
    }
});

module.exports=mongoose.model('Project', projectSchema);