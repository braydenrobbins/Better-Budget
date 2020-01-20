const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Budget = require("../models/Budget");

router.post("/",
  [
    check("month", "Please select the month")
      .not()
      .isEmpty(),
    check("totalExpenditure", "Please add the total expenditure")
      .not()
      .isEmpty(),
    check("categoryArray", "Please add some categories")
      .not()
      .isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, month, totalExpenditure, categoryArray } = req.body;

    try {
      let budget = await Budget.findOne({ username, month });
      if (budget)
        return res.status(400).json({ msg: "There is already a budget for that month" });

      budget = new Budget({ username, month, totalExpenditure, categoryArray });

      await budget.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
