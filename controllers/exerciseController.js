const Exercise = require("../models/Exercise");

exports.createExercise = async (request, response) => {
  try {
    const {
      title,
      videoUrl,
      isFavorite
    } = request.body; // Get the values from the request.body object, notice these values are the same ones from the model.

    const doesAnExerciseWithTheSubmittedVideoUrlExists = await Exercise.findOne({
      videoUrl
    }); // Since the videoUrl property in the model has the unique property set to true, we first check if there is an exercise
        // with the same video url.

    if (doesAnExerciseWithTheSubmittedVideoUrlExists) {
      response.json({ success: false, message: "An exercise with that video url already exists." });
      return;
      // If there is an exercise with that video url already in the database we will respond with the object above
      // AND we will return early to stop executing this funciton since we do NOT want to add a duplicate. Either way
      // IF the code continues executing and tries to insert an exercise with a duplicate video url it will not work
      // because we added `unique: true` to the `videoUrl` property in the model.
    }

    const newExerciseToInsertToTheDatabase = {
      title,
      videoUrl,
      isFavorite
    }; // Create and object containing the neccesary data to create a new exercise in the database. Comes from the destructuring from above.

    const createdExercise = await Exercise.create(newExerciseToInsertToTheDatabase); // Create the new exercise and save the returned created document in a variable.

    response.json({ success: true, exercise: createdExercise }); // Send the created document as a response.

  } catch (error) {
    if (error.name === "ValidationError") { // If the error is a validation error from the schema `required: [true, "Please enter a title"]`
      response.status(400).json({ success: false, message: error.message }); // Responsed with status 400: Bad Request and send the validation message.
    } else {
      // Otherwise return a generic error.
      console.error(error);
      
      response.status(500).json({ success: false, message: "Server Error" });
    }
  }
}

exports.getExercises = async (request, response) => {
  try {
    const exercisesFromDatabase = await Exercise.find(); // Get all exercises from the database.

    response.json({ success: true, exercises: exercisesFromDatabase });
  } catch (error) {
    console.error(error);
    response.status(500).json({ sucess: false, message: error.message });
  }
}
