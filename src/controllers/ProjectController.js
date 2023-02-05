// Import the Project model
const Project = require('../models/Project');

// Add a new project
exports.addProject = (req, res) => {
// Destructure projectName and projectDesc from the request body
const { projectName, projectDesc } = req.body;
// Create a new project instance with projectName, projectDesc, and status
const project = new Project({projectName, projectDesc, status: 'pending'});
// Save the project instance to the database
project
.save()
.then(project => {
// Return a success message along with the project data
res.json({message: 'Project added successfully', project});
})
.catch(error => {
// Return an error response with a 400 status code
res.status(400).json({error: error.message});
});
};

// Search for projects by name
exports.searchProjects = (req, res) => {
// Destructure projectName from the query parameters
const { projectName } = req.query;
let query = {};
// Check if projectName exists in the query parameters
if (projectName) {
// Set the query to find projects by name using a regular expression
query = { projectName: { $regex: projectName, $options: 'i' } };
}
// Find projects based on the query
Project.find(query)
.then(projects => {
// Return the projects in the response
res.json({projects});
})
.catch(error => {
// Return an error response with a 400 status code
res.status(400).json({error: error.message});
});
};

// Filter projects by status
exports.filterProjects = (req, res) => {
// Destructure status from the query parameters
const { status } = req.query;
// Find projects based on the status
Project.find({ status })
.then(projects => {
// Return the projects in the response
res.json({projects});
})
.catch(error => {
// Return an error response with a 400 status code
res.status(400).json({error: error.message});
});
};

// Paginate projects
exports.paginateProjects = (req, res) => {
// Destructure page and limit from the query parameters with default values
const { page = 1, limit = 10 } = req.query;
// Find all projects
Project.find({})
// Skip projects based on the page number and limit
.skip((page - 1) * limit)
.limit(parseInt(limit))
.then(projects => {
// Return the projects in the response
res.json({projects});
})
.catch(error => {
// Return an error response with a 400 status code
res.status(400).json({error: error.message});
});
};