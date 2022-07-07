const mongoose = require("mongoose");
// It is convention to name the file as singular and capitalizedj.

// ExerciseSchema defines the shape of the document we want to store in our database.
const ExerciseSchema = new mongoose.Schema({
  title: { // Has a title of type String and it is required in order to be inserted to the database
    type: String,
    required: [true, "Please enter a title"], // "Please enter a title" refers to the message that
                                              // will appear if this validation is triggered that
                                              // being when the user does not include a title.
    trim: true // Removes whitespaces in the front and end of the string.
  },
  videoUrl: {
    type: String,
    required: [true, "Please enter a video url"],
    unique: true, // Only one document with the same video url is allowed
    trim: true
  },
  isFavorite: {
    type: Boolean,
    default: false // This property is not neccesary to be included in the request,
                   // if it is NOT included it will default to false. If it IS included
                   // it will have the value the user specifies.
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  // updatedAt: {
  //   type: Date
  // }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt properties to the model
                   // and adds the appropriate values to them instead of us needing to 
                   // add the properties manually like the commented section above.
});

module.exports = mongoose.model("Exercise", ExerciseSchema); // Compiles the model so we can use it to
                                                         //interact with the database later.
                                                         // To use this in other files we would do
                                                         // something like this: `const User = require('...');`
                                                         // It is convention to name the model as singular and capitalized.
