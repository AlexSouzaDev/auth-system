const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [3, 'Title must be at least 3 characters'],
        maxLength: [100, 'Title must be at most 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userID is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema); // Export the Post model