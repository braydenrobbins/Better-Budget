const mongoose = require("mongoose");

const BudgetSchema = mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  totalExpenditure: {
    type: Number,
    required: true
  },
  categoryArray: {
    type: [],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("budget", BudgetSchema);
