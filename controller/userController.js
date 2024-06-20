const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = generateAuthToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};
