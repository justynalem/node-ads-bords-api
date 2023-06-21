const UserModel = require("./user.model");

async function handleAddUser(req, res) {
  try {
    await UserModel.create({
      login: req.body.login,
      password: req.body.password,
    });
    res.status(201).send("user created");
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

module.exports = {
  handleAddUser,
};
