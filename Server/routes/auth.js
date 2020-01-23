const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
const User = require("../models/User");

// router.use(cookieParser());

router.post('/refresh', async (req, res) => {
  const user = await User.findById(req.body._id).select("-password");
  if (!user) return res.status(400).json({ msg: "User not found" });
  console.log(req.cookies)
  const refreshToken = req.cookies.refreshToken
  if (refreshToken == null) return res.sendStatus(401)
  jwt.verify(refreshToken, config.get("refreshSecret"), (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken })
  })
})

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const payload = { user: { _id: user._id } };
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"))
    console.log('token after login', refreshToken);
    jwt.sign(payload, config.get("accessSecret"), { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          _id: user._id,
          token,
          username: user.username,
          budgets: user.budgets,
          email: user.email
        });
      });
    res.cookie('refreshToken', refreshToken, { maxAge: 200000, httpOnly: false });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
