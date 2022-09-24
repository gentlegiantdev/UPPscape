const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
