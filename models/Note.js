const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  post: {
  type: String,
  },
  noteText: {
   type: String,
  },
  source: {
   type: String,
  },
  sourceType: {
   type: String,
  },
  addedBy: {
   type: Array,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  concern: {
   type: String,
  },
  concernType: {
   type: String,
  },
  concernLevel: {
   type: Number,
  },
  immediacyLevel: {
   type: Number,
  },
  
});

module.exports = mongoose.model("Note", NoteSchema);
