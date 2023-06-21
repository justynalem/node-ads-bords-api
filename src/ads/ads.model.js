const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: String,
    authorId: mongoose.Schema.Types.ObjectId,
    category: String,
    tags: [String],
    price: Number,
  },
  { timestamps: true }
);

const Ad = mongoose.model('ads', AdSchema)

module.exports = Ad