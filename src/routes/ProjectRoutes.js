const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.post('/addProject', checkToken, ProjectController.addProject);
router.get('/searchProjects', checkToken, ProjectController.searchProjects);
router.get('/filterProjects', checkToken, ProjectController.filterProjects);
router.get('/paginateProjects', checkToken, ProjectController.paginateProjects);

module.exports = router;
