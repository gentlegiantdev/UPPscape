const cloudinary = require("../middleware/cloudinary");
const Account = require("../models/Account");

module.exports = {
  getAccounts: async (req, res) => {
    try {
      const accounts = await Account.find().collation({locale:'en',strength: 2}).sort({accountName:1}).lean();
      res.render("accounts.ejs", { accounts: accounts });
    } catch (err) {
      console.log(err);
    }
  },
  createAccount: async (req, res) => {
    try {

      await Account.create({
        accountName: req.body.accountName,
      });
      console.log("Account has been added!");
      res.redirect("/accounts");
    } catch (err) {
      console.log(err);
    }
  }
};
