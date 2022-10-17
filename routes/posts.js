const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes 
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.get("/changePlant/:id", ensureAuth, postsController.getChangePlant);

router.put("/updatePost/:id", upload.single("file"), postsController.updatePost);

router.delete("/deletePost/:id", postsController.deletePost);

router.put("/updatePostServiceDate/:id", postsController.updatePostServiceDate);

router.put("/updateAllPostServiceDates/:id", postsController.updateAllPostServiceDates);


module.exports = router;
