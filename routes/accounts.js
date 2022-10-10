const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const accountsController = require("../controllers/accounts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/accounts/:id", ensureAuth, accountsController.getAccounts);

router.post("/createAccount", ensureAuth, accountsController.createAccount);



module.exports = router;
