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
      //format the input value to covert text to title case and remove whitespace from both ends 
      req.body.accountName = req.body.accountName.trim().toLowerCase().split(' ');
      for(i = 0; i < req.body.accountName.length; i++){
        req.body.accountName[i] = req.body.accountName[i][0].toUpperCase() + req.body.accountName[i].substr(1);
      }
      req.body.accountName = req.body.accountName.join(" ");
      console.log(req.body.accountName)

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
