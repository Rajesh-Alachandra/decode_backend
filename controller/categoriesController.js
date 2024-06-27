// controller/categoryController.js
const Category = require('../models/categoryModel');
const Work = require('../models/workModel');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getCategoryById = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateCategory = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send();
        }

        updates.forEach((update) => category[update] = req.body[update]);
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteCategory = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(_id);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getAllCategoriesWithWorks = async (req, res) => {
    try {
        const categories = await Category.find({});
        const categoriesWithWorks = await Promise.all(
            categories.map(async (category) => {
                const works = await Work.find({ category: category._id }).populate('category', 'name');
                return { category, works };
            })
        );
        res.send(categoriesWithWorks);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching categories with works', error });
    }
};
