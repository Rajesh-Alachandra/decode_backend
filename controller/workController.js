const Work = require('../models/workModel');
const Category = require('../models/categoryModel');

exports.createWork = async (req, res) => {
    const { title, description, date, company, challenge, solutions, briefs, category } = req.body;
    try {
        const work = new Work({
            title,
            description,
            date: date || null,
            company,
            challenge,
            solutions,
            briefs,
            category
        });

        if (req.files && req.files.image) {
            const image = req.files.image[0];
            work.image = {
                filename: image.filename,
                path: `//uploads/${image.filename}`,
                mimetype: image.mimetype
            };
        }

        if (req.files && req.files.sliderImages) {
            work.sliderImages = req.files.sliderImages.map(file => ({
                filename: file.filename,
                path: `/uploads/${file.filename}`,
                mimetype: file.mimetype
            }));
        }

        await work.save();
        res.status(201).send(work);
    } catch (error) {
        res.status(400).send({ message: 'Error creating work', error });
    }
};

exports.getAllWorks = async (req, res) => {
    try {
        const works = await Work.find({}).populate('category', 'name');
        res.send(works);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching works', error });
    }
};

exports.getWorkById = async (req, res) => {
    const _id = req.params.id;
    try {
        const work = await Work.findById(_id).populate('category', 'name');
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }
        res.send(work);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching work', error });
    }
};

exports.updateWork = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'image', 'date', 'company', 'challenge', 'solutions', 'briefs', 'sliderImages', 'category'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const work = await Work.findById(req.params.id);
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }

        updates.forEach((update) => {
            if (req.body[update] !== undefined) {
                work[update] = req.body[update];
            }
        });

        // Handle single file upload for image
        if (req.files && req.files.image) {
            const image = req.files.image[0];
            work.image = {
                filename: image.filename,
                path: `//uploads/${image.filename}`,
                mimetype: image.mimetype
            };
        }

        // Handle multiple file uploads for sliderImages
        if (req.files && req.files.sliderImages) {
            work.sliderImages = req.files.sliderImages.map(file => ({
                filename: file.filename,
                path: `/uploads/${file.filename}`,
                mimetype: file.mimetype
            }));
        }

        await work.save();
        res.send(work);
    } catch (error) {
        res.status(400).send({ message: 'Error updating work', error });
    }
};

exports.deleteWork = async (req, res) => {
    const _id = req.params.id;
    try {
        const work = await Work.findByIdAndDelete(_id);
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: 'Error deleting work', error });
    }
};

exports.getWorksByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const works = await Work.find({ category: categoryId }).populate('category', 'name');
        if (!works.length) {
            return res.status(404).send({ message: 'No works found for this category' });
        }
        res.send(works);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching works by category', error });
    }
};




