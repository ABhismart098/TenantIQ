const Joi = require("joi");

exports.createTenantSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10),
  role_id: Joi.number().required()
});
