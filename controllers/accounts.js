const cloudinary = require("../middleware/cloudinary");
const Account = require("../models/Account");

module.exports = {
  getAccounts: async (req, res) => {
    try {
      const accounts = await Account.find({ userCompany: req.params.id }).collation({locale:'en',strength: 2}).sort({accountName:1}).lean();
      res.render("accounts.ejs", { accounts: accounts, user: req.user });
      console.log(req.params.id)
    } catch (err) {
      console.log(err);
    }
  },
  createAccount: async (req, res) => {
    try {

      await Account.create({
        accountName: req.body.accountName,
        userCompany: req.body.userCompany,
      });
      console.log("Account has been added!");
      res.redirect(`/accounts/${req.body.userCompany}`);
    } catch (err) {
      console.log(err);
    }
  }
};
