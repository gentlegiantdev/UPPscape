const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const accountsController = require("../controllers/accounts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);
router.get("/privacypolicy", homeController.getPrivacy);
router.get("/privacypolicy/#cookies", homeController.getCookie);
router.get("/termsofuse", homeController.getTerms);
router.get("/affiliates", homeController.getAffiliates);
router.get("/contact", homeController.getContact);
router.get("/accounts/:id", ensureAuth, accountsController.getAccounts);
router.get("/profile/", ensureAuth, postsController.getProfile);
router.get("/feed/:id", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", upload.single("file"), authController.postSignup);



module.exports = router;
