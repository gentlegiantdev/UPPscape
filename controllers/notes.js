const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Note = require("../models/Note");


module.exports = {

createNote: async (req, res) => {
    try {

      await Note.create({
        company: req.body.company,
        account: req.body.account,
        post: req.body.post,
        location: req.body.location,
        plantName: req.body.plantName,
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
  
      res.render("note.ejs", { note: note, note_id: req.params.id, post_id: req.params.post, user: req.user });
      console.log(note);
    } catch (err) {
      console.log(err);
    }
  },

  getConcerns: async (req, res) => {
     try {
      const notes = await Note.find({company: req.params.id, concern: true }).sort({ createdAt: "desc" }).lean();
      res.render("concerns.ejs", { notes: notes, user: req.user });
      console.log(req.params);
    } catch (err) {
      console.log(err);
    }
  },

  removeConcern: async (req, res) => {
   try {
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { concern: false, concernLevel: 0, immediacyLevel: 0},
      );
      console.log("Concern has been resolved.");
      res.redirect(`/note/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

}