const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  account: {
   type: String,
  },
  building: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  locationNumber: {
    type: Number,
    required: true,
  },
  lightLevel: {
    type: Number,
    required: true,
  },
  currentPlant: {
    type: String,
    required: true,
  },
  plantSize: {
    type: String,
    required: true,
  },
  plantImage: {
    type: String,
    require: false,
  },
  previousPlants: {
    type: Array,
    required: false,
  },
  lastServicedDate: {
    type: Date,
    required: false,
  },
  currentTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  previousTechnicians: {
    type: Array,
    require: false,
  },
  coordinates: {
    type: Array,
    require: false,
  },
   notes: {
    type: Array,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
