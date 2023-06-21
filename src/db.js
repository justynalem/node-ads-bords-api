require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.CONNECTION_STRING;

async function init() {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  });
}

init().catch(err => console.log(err));

module.exports = {
  init,
};
