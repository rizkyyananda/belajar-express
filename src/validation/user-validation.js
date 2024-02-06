import Joi from "joi";

const registerUserValidate = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
});

export{
    registerUserValidate
}