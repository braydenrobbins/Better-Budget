const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");

router.patch('/', auth, function (req, res, next) {
  const record = req.body;
  const { budgets } = record;
  const month = budgets.month
  User.findByIdAndUpdate(record._id, record, (err, user) => {
    user.budgets.map(budget => {
      if (budget.month === month)
        return res.status(400).json({ msg: "There is already a budget for that month" });
    });
    if (err) {
      console.error("couldnt find user", err)
      res.send('couldnt find user');
    } else {
      console.log("success")
      res.json(user)
    }
  })
});

module.exports = router;
