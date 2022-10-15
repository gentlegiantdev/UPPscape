const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const notesController = require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/createNote/", ensureAuth, notesController.createNote);

router.get("/:id", ensureAuth, notesController.getNote);

router.get("/concerns/:id", ensureAuth, notesController.getConcerns);

router.put("/removeconcern/:id", ensureAuth, notesController.removeConcern);

router.delete("/deleteNote/:id", ensureAuth, notesController.deleteNote);

module.exports = router;
