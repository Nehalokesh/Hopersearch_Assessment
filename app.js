const express = require('express');

// Importing Mongoose to connect to the MongoDB database
const mongoose = require('mongoose'); 

// Importing Morgan for logging requests
const morgan = require('morgan'); 

 // Importing CORS to handle cross-origin requests
const cors = require('cors');

// Importing the User Routes
const UserRoutes = require('./src/routes/UserRoutes'); 

// Importing the Project Routes
const ProjectRoutes = require('./src/routes/ProjectRoutes'); 

 // Importing the Task Routes
const TaskRoutes =require('./src/routes/TaskRoutes');

// Importing the Configurations
const config = require('./src/config/config'); 

// Setting Mongoose to strictQuery to avoid any accidental query injection
mongoose.set('strictQuery', true);

// Initializing Express app
const app = express();

// Enabling CORS, Morgan and JSON middleware in the Express app
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Using the UserRoutes, ProjectRoutes, and TaskRoutes in the Express app
app.use('/api/users', UserRoutes);
app.use('/api/projects', ProjectRoutes);
app.use('/api/task',TaskRoutes)

// Getting the Port from the Configurations
const port = config.port;

// Connecting to MongoDB database and starting the server if successful
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
})
.catch(err => {
console.log(err);
});