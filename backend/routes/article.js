const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const Article = require("../models/Article");
const User = require("../models/User");
const Like = require("../models/Like");
const { body, validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

router.get("/", (req, res) => {
  res.send("Working");
});

router.post(
  "/addArticle",
  [body("title").isLength({ min: 3 }), body("aText").isLength({ min: 3 })],
  fetchUser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        invalidEntry: true,
      });
    }
    const userId = req.user.id;
    if (!userId) {
      res.status(401).json({ error: "You need to login first" });
    }
    try {
      const user = await User.findOne({ _id: userId });
      const { title, aText } = req.body;
      // res.send(user);

      const username = user.email.split("@")[0];
      const article = await Article.create({
        title: title,
        aText: aText,
        uname: username,
        uid: userId,
        authName: user.name,
      });

      const aLike = await Like.create({
        articleId: article._id,
      });
      success = true;
      res.send({ success, article });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Internal Server Error", success: false });
    }
  }
);

router.get("/allArticle", async (req, res) => {
  try {
    const allArticle = await Article.find({});
    // console.log(typeof allArticle);

    res.send({ success: true, allArticle });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

router.get("/userArticle", fetchUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const allUserArticle = await Article.find({ uid: user._id });
    res.send({ success: true, allUserArticle });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

router.post("/singleArticle", async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.body.id });
    res.send({ success: true, article });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

router.delete("/deleteOne", fetchUser, async (req, res) => {
  try {
    // const { id } = req.body.id;
    console.log(req.body);

    const findArt = await Article.findOne({ _id: req.body.id });
    // if (req.user.id !== findArt.uid) {
    //   return res.status(401).send({ userId: req.user.id, uid: findArt.uid });
    // }
    // { userId: req.user.id, uid: findArt.uid }
    // success: false, msg: "UnAuthorised To delete"
    const delArt = await Article.findByIdAndDelete(req.body.id);
    const delLikeArticle = await Like.findOneAndDelete({
      articleId: req.body.id,
    });
    res.send({ success: true, article: delArt });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
