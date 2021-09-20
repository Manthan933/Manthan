const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  check,
  validationResult
} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Classroom = require("../../models/Classroom");

// GET, api/auth // type of req, url
// Public route

router.get(
  "/",
  auth, // middleware that makes this route a protected route
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const classrooms = await Classroom.find({
        joinedUsers: req.user.id,
      });
      res.json({
        user: user,
        classes: classrooms,
      }); // return user data in json
    } catch (err) {
      res.status(500).send("Server errror");
    }
  }
);

// POST api/auth
// Authenticate user and get token route
// Public
// login
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
    check("remember", "should be a boolean").isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // destructure
    const {
      email,
      password,
      remember
    } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        // if user doesn't exists
        return res.status(400).json({
          errors: [{
            msg: "Invalid credentials",
          }, ],
        });
      }

      // check if password matches
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(400).json({
          errors: [{
            msg: "Invalid credentials",
          }, ],
        });
      }

      // data in token
      const payload = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };

      // create token
      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`, {
          expiresIn: remember ? "60 days" : "5 days",
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;