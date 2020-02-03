const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, config.get("jwtSecret"), async (err, decodedUser) => {
    if (err) return res.send('Invalid Token');
    const user = await User.findById(decodedUser.user._id).select("-password");;
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.json(user);
  })
})

router.post("/", async (req, res) => {
  const { username, password } = await req.body || '';
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const payload = await { user: { _id: user._id } };
    await jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 86400 },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { maxAge: 86400, httpOnly: true })
        res.json({
          _id: user._id,
          token,
          username: user.username,
          budgets: user.budgets,
          email: user.email
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete('/', (req, res) => {
  res.clearCookie('token', { maxAge: 86400, httpOnly: true });
  console.log('token deleted');
})

module.exports = router;
