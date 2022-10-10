const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const notesController = require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/createNote/", ensureAuth, notesController.createNote);

router.delete("/deleteNote/:id", ensureAuth, notesController.deleteNote);

module.exports = router;
