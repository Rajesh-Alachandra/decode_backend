const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String }
    },
    sliderImages: [{
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String }
    }],
    date: { type: Date },
    company: { type: String },
    challenge: { type: String },
    solutions: { type: String },
    briefs: { type: String }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Work', WorkSchema);
