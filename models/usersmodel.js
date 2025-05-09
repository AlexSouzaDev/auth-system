const mongoose = require('mongoose');
const User = require('../models/usersmodel'); // Import the User model
const MimeNode = require('nodemailer/lib/mime-node');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'user is required'],
        trim: true,
        unique: [true, 'user must be unique'],
        minLength: [3, 'user must be at least 3 characters'],
        maxLength: [20, 'user must be at most 20 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'user must be alphanumeric'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: [true, 'email must be unique'],
        lowercase: true,
        minLength: [3, 'email must be at least 3 characters'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationTokenValidation: {
        type: Number,
        select: false,
    },
    forgotPasswordToken: {
        type: String,
        select: false,
    },
    forgotPasswordTokenValidation: {
        type: Number,
        select: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // Export the User model

