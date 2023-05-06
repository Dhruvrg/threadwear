const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "hareKrishna";

//Route 1 : Signup
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneNo", "Enter a valid phone no.").isMobilePhone(),
    body("address", "Enter your residentail address"),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exits",
        });
      }
      user = await User.findOne({ phoneNo: req.body.phoneNo });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this phone no. already exits",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        password: secPass,
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
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2 : Login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("phoneNo", "Enter a valid phone no."),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req.body.email && req.body.phoneNo);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, phoneNo } = req.body;

    try {
      let user1 = await User.findOne({ email });
      let user2 = await User.findOne({ phoneNo });
      let user = user1 === null ? user2 : user1;
      if (!user1 && !user2) {
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

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3 : Get User data
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error occured");
  }
});
module.exports = router;
