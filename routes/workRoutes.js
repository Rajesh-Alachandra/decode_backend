//!!!!!!! In workRoutes.js
const express = require('express');
const router = express.Router();
const workController = require('../controller/workController');
const upload = require('../middlewares/multerMiddleware');

//!!!!!!! Other route definitions
router.post('/createWork', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'sliderImages', maxCount: 10 } // Adjust maxCount as needed
]), workController.createWork);

router.get('/works', workController.getAllWorks);
router.get('/work/:id', workController.getWorkById);
router.patch('/work/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'sliderImages', maxCount: 10 }
]), workController.updateWork);
router.delete('/work/:id', workController.deleteWork);

module.exports = router;
