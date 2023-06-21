const UserModel = require("./user.model");
const Joi = require("joi");

const userCreateSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

async function authenticate(req, res, next) {
  const token = req.get("Authorization");
  if (!token) {
    console.log("Authorization not given");
    res.status(401).send("not authorized - please log in");
    return;
  }
  const [login, password] = token.split(":");
  if (!login || !password) {
    console.log("Login or password not given");
    res.status(401).send("not authorized: login and password required");
    return;
  }
  const user = await UserModel.findOne({ login, password });
  if (!user) {
    console.log("No user with these credentials in db");
    res.status(401).send("not authorized - please sign up");
    return;
  }
  req.user = user;
  next();
}

async function createUserValidation(req, res, next) {
  try {
    await userCreateSchema.validateAsync({
      login: req.body.login,
      password: req.body.password,
    });
    next()
  } catch (e) {
    console.log(e)
    res.status(400).send(`Both login and password is required :${e}`);
  }
}

module.exports = {
  authenticate,
  createUserValidation
};
