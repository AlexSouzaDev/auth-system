const Joi = require('joi');

exports.signupSchema = Joi.object({
    user: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .min(6)
        .max(60)
        .email(),
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
});