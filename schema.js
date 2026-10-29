// we can install joi because it is a validation library that allows us to define schemas for our data and validate them easily. It helps ensure that the data we receive or send meets certain criteria, which can prevent errors and improve the reliability of our application. 
// syntax of the joi library is as follows:
// variable = joi.object({
//     key: joi.string().required(),
//     key: joi.number().required(),
//     key: joi.boolean().required(),
//     key: joi.array().items(joi.string()).required(),
//     key: joi.object({
//         nestedKey: joi.string().required()
//     }).required()
// });


const joi = require("joi");

module.exports.listingSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().allow("", null),
    price: joi.number().required().min(0),
    location: joi.string().required(),
    country: joi.string().required(),
});