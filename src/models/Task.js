const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDesc: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['progress', 'pending', 'done'],
        default: 'pending'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports=mongoose.model('Task', taskSchema);