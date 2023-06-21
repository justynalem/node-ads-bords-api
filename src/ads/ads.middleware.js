const Joi = require("joi");

const addAdSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required().min(0),
});

async function validateAddAd(req, res, next) {
  try {
    await addAdSchema.validateAsync(req.body);
    next()
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports ={
  validateAddAd
}