const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER
router.post("/register", async (req, res) => {
  try {
    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json("User registered ✅");
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔑 LOGIN
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found ❌");

    // compare password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Wrong password ❌");

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    const { password, ...otherDetails } = user._doc;

res.json({ token, user: otherDetails });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;