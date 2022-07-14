const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: [true, "Please enter a title"],
    trim: true
  },
  videoUrl: {
    type: String,
    required: [true, "Please enter a video url"],
    unique: true,
    trim: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  // updatedAt: {
  //   type: Date
  // }
}, {
  timestamps: true
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
