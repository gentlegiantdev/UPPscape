const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const accountsController = require("../controllers/accounts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/accounts", ensureAuth, accountsController.getAccounts);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed/:id", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/newcompany", authController.getCompanySignup);
router.post("/newcompany", authController.postCompanySignup);
router.get("/companylogin", authController.getCompanyLogin);
router.post("/companylogin", authController.postCompanyLogin);
router.get("/midpoint", authController.getMidpoint);


module.exports = router;
