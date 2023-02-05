// Import Task model
const Task = require('../models/Task');

// Add a new task
exports.addTask = (req, res) => {
// Destructure task details from request body
const { projectId, taskName, taskDesc, priority } = req.body;
// Create a new task
const task = new Task({projectId, taskName, taskDesc, priority, status: 'pending'});
// Save the task to the database
task.save()
.then(task => {
// Return success message and saved task
res.json({message: 'Task added successfully', task});
})
.catch(error => {
// Return error message
res.status(400).json({error: error.message});
});
};

// Search tasks
exports.searchTasks = (req, res) => {
// Destructure taskName from query parameters
const { taskName } = req.query;
let query = {};
// Check if taskName is a string
if (typeof taskName === 'string') {
// Create query for taskName search
query = { taskName: { $regex: taskName } };
}
// Search for tasks matching the query
Task.find(query)
.then(tasks => {
// Return found tasks
res.json({tasks});
})
.catch(error => {
// Return error message
res.status(400).json({error: error.message});
});
};

// Filter tasks
exports.filterTasks = (req, res) => {
// Destructure status from query parameters
const { status } = req.query;
// Search for tasks with the specified status
Task.find({ status })
.then(tasks => {
// Return found tasks
res.json({tasks});
})
.catch(error => {
// Return error message
res.status(400).json({error: error.message});
});
};

// Paginate tasks
exports.paginateTasks = (req, res) => {
// Destructure page and limit from query parameters
const { page = 1, limit = 10 } = req.query;
// Find all tasks
Task.find({})
// Skip tasks before the specified page
.skip((page - 1) * limit)
// Limit the number of tasks returned
.limit(parseInt(limit))
.then(tasks => {
// Return found tasks
res.json({tasks});
})
.catch(error => {
// Return error message
res.status(400).json({error: error.message});
});
};