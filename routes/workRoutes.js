const express = require('express');
const router = express.Router();
const workController = require('../controller/workController');
const upload = require('../middlewares/multerMiddleware');

// Example route for creating a new work with image upload
router.post('/works', upload.single('image'), workController.createWork);

// Define other routes as needed
router.get('/works', workController.getAllWorks);
router.get('/works/:id', workController.getWorkById);
router.patch('/works/:id', workController.updateWork);
router.delete('/works/:id', workController.deleteWork);

module.exports = router;

