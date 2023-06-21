const express = require("express");
const router = express.Router();

const { handleAddUser } = require("./user.handlers");
const { createUserValidation } = require("./user.middleware");

router.post("/", createUserValidation, handleAddUser);

module.exports = router;
