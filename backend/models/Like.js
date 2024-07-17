const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
  },
  usersLiked: {
    type: [String],
    default: [],
  },
});

const Like = mongoose.model("Lkie", userSchema);
module.exports = Like;
