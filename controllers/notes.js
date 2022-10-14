const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Note = require("../models/Note");


module.exports = {

createNote: async (req, res) => {
    try {

      await Note.create({
        post: req.body.post,
        noteText: req.body.noteText,
        source: req.body.source,
        sourceType: req.body.sourceType,
        addedBy: req.body.addedBy,
        dateAdded: req.body.dateAdded,
        concern: req.body.concern,
        concernType: req.body.concernType,
        concernLevel: req.body.concernLevel,
        immediacyLevel: req.body.immediacyLevel,  
      });
      console.log("Note has been added!");
      console.log(req.body);
      res.redirect(`/post/${req.body.post}`);
    } catch (err) {
      console.log(err);
    }
  },

   deleteNote: async (req, res) => {
    try {
      // Find note by id
      let note = await Note.findById({ _id: req.params.id });
      // Delete note from db
      await Note.remove({ _id: req.params.id });
      console.log("Deleted Note");
      res.redirect(`/post/${note.post}`);
      console.log(req.body);
    } catch (err) {
      res.redirect(`/post/${note.post}`);
    }
  },

   getNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
  
      res.render("note.ejs", { note: note, note_id: req.params.id, post_id: req.params.post });
    } catch (err) {
      console.log(err);
    }
  },


}