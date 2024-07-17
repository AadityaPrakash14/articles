const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

router.get("/", async (req, res) => {
  const all = await Like.find({});
  res.send(all);
});

router.post("/addArticleId", async (req, res) => {
  try {
    const { id } = req.body;
    const aLike = await Like.create({
      articleId: id,
    });
    res.send({ success: true, aLike });
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

router.post("/getLikes", async (req, res) => {
  try {
    const { articleId } = req.body;
    const articleLikes = await Like.findOne({ articleId });
    res.send({ success: true, articleLikes: articleLikes.usersLiked });
  } catch (error) {
    res.send({ success: true, msg: "Some Error Occured" });
  }
});

router.put("/addRemLike", async (req, res) => {
  try {
    const { articleId, uname } = req.body;
    const likedArticle = await Like.findOne({ articleId });
    let isFound = false;
    for (let i = 0; i < likedArticle.usersLiked.length; i++) {
      if (likedArticle.usersLiked[i] === uname) {
        isFound = true;
        likedArticle.usersLiked.splice(i, 1);
        break;
      }
    }
    if (!isFound) {
      likedArticle.usersLiked.push(uname);
    }
    let newArr = likedArticle.usersLiked;
    const newLike = await Like.findOneAndUpdate({ articleId }, likedArticle, {
      new: true,
    });
    res.send({ success: true, articleLikes: newArr });
  } catch (error) {
    res.status(400).send({ success: false, msg: "Some Error Occured" });
  }
});

module.exports = router;
