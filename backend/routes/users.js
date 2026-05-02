const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");

// 👉 Add user (avoid using this now)
router.post("/add", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json("User added ✅");
  } catch (err) {
    res.status(500).json(err);
  }
});

// 👉 Get all users (ADMIN ONLY)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;