const express = require('express');
const router = express.Router();
const workController = require('../controller/workController');
const upload = require('../middlewares/multerMiddleware');

// Ensure you have imported the correct controllers
const categoryController = require('../controller/categoriesController');

// Category routes
router.post('/createCategory', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.patch('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

// Work routes
router.post('/createWork', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'sliderImages', maxCount: 10 }
]), workController.createWork);

router.get('/works', workController.getAllWorks);
router.get('/work/:id', workController.getWorkById);
router.patch('/work/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'sliderImages', maxCount: 10 }
]), workController.updateWork);
router.delete('/work/:id', workController.deleteWork);

// Add this new route for getting works by category
router.get('/works/category/:categoryId', workController.getWorksByCategory);

// Add this new route for getting all categories with works
router.get('/categories-with-works', categoryController.getAllCategoriesWithWorks);

module.exports = router;
