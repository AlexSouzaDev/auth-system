const { signupSchema } = require('../middlewares/validator');
const User = require('../models/User');
const { doHash } = require('../utils/hashing');
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
