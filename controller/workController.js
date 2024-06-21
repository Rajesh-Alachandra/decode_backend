const Work = require('../models/workModel');
const upload = require('../middlewares/multerMiddleware');

exports.createWork = async (req, res) => {
    const { title, description, date, company, challenge, solutions, briefs } = req.body;
    try {
        const work = new Work({
            title,
            description,
            date: date || null,  // Ensure date is null if not provided
            company,
            challenge,
            solutions,
            briefs
        });

        if (req.file) {
            work.image = {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype
            };
        }

        await work.save();
        res.status(201).send(work);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllWorks = async (req, res) => {
    try {
        const works = await Work.find({});
        res.send(works);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getWorkById = async (req, res) => {
    const _id = req.params.id;
    try {
        const work = await Work.findById(_id);
        if (!work) {
            return res.status(404).send();
        }
        res.send(work);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateWork = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'image', 'date', 'company', 'challenge', 'solutions', 'briefs'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const work = await Work.findById(req.params.id);
        if (!work) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            if (req.body[update] !== undefined) {
                work[update] = req.body[update];
            }
        });

        if (req.file) {
            work.image = {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype
            };
        }

        await work.save();
        res.send(work);
    } catch (error) {
        res.status(400).send(error);
    }
};
