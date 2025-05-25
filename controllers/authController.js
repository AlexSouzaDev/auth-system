const jwt = require('jsonwebtoken');
const { signupSchema } = require('../middlewares/validator');
const User = require('../models/usersmodel'); // Import the User model
const { doHash, doHashValidation } = require('../utils/hashing');
const { hash } = require('bcryptjs');

exports.register = async (req, res) => {
    const { user, email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ user, email, password });

        if (error) {
            return res.status(401).json({
                sucess: false,
                message: error.details[0].message,
            });
        }
        const existingUser = await User.findOne({ user, email });

        if (existingUser) {
            return res.status(401).json({
                sucess: false,
                message: 'User already exists',
            });
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = new User({
            user,
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            result,
        });
    } catch (error) {

    }
};

exports.login = async (req, res) => {
    const { user, email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ user, email, password });
        if (error) {
            return res.status(401).json({
                sucess: false,
                message: error.details[0].message,
            });
        }

        const existingUser = await User.findOne({ user, email }).select('+password');
        if (!existingUser) {
            return res.status(401).json({
                sucess: false,
                message: 'User does not exist',
            });
        }
        const result = await doHashValidation(password, existingUser.password);
        if (!result) {
            return res.status(401).json({
                sucess: false,
                message: 'Invalid credentials',
            });
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified,
        }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('Authorization', 'Bearer' + token, {
            expires: new Date(Date.now() + 3600000), // 1 hour
            httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'
        }).json({
            sucess: true,
            message: 'User logged in successfully',
            token,
            user: {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            },
        });
    } catch (error) {
        console.log(error);
    }
}
