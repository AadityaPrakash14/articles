const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  aText: {
    type: String,
    required: true,
  },

  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uname: {
    type: String,
    required: true,
  },
  authName: {
    type: String,
    required: true,
  },
  userLiked: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Article", articleSchema);
