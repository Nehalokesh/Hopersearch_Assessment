const express = require('express');

const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.post('/addTask', TaskController.addTask);
router.get('/searchTasks', TaskController.searchTasks);

router.get('/filterTasks', TaskController.filterTasks);

router.get('/paginateTasks', TaskController.paginateTasks);

module.exports=router;
