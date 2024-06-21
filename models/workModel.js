const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String }
    },
    date: { type: Date, },
    company: { type: String, },
    challenge: { type: String, },
    solutions: { type: String, },
    briefs: { type: String, }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Work', WorkSchema);



//const mongoose = require('mongoose');

// const WorkSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     image: { type: String, required: true },
//     date: { type: Date, required: true },
//     company: { type: String, required: true },
//     challenge: { type: String, required: true },
//     solutions: { type: String, required: true },
//     briefs: { type: String, required: true }
// });

// module.exports = mongoose.model('Work', WorkSchema);
