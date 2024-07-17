const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "ThisisJWTsecretKey$";

router.get("/", (req, res) => {
  res.send("Auth Page");
});

//Route 1: To CREATE USER : POST :- localhost:5000/auth/createuser
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
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

    let user = await User.findOne({ email: req.body.email });

    // console.log(user);

    if (user) {
      return res.status(400).send({
        success: false,
        msg: "User with this email already Exits",
        mailUsed: true,
      });
    }

    try {
      const hash = await bcrypt.hash(req.body.password, 12);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(401).send({ success: false, msg: "Internal Server Error" });
    }
  }
);

// To Login a USER : POST :- localhost:5000/auth/login
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: "Invalid Entries" });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      let username = user.email.split("@")[0];
      const data = {
        user: {
          id: user.id,
          uname: username,
          authName: user.name,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, msg: "Internal Server Error" });
    }
  }
);

router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, user: null });
  }
});

router.get("/isAuthentic", fetchUser, (req, res) => {
  if (req.user) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;
