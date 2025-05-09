const Joi = require('joi');

exports.signupSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
})