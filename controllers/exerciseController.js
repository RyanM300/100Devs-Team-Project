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

exports.getExercise = async (request, response) => {
  const { id } = request.params; // Get the id from the url. Example "locahost:5000/exercises/1", in this case the value of id would be 1.

  try {
    const exerciseFromDatabase = await Exercise.findOne({ _id: id }); // Get exercise that specified by its id.

    if (!exerciseFromDatabase) { // If there is not exercise with that id, return 404 Not Found.
      response.status(404).json({ success: false, message: "No exercise found." });
      return;
    }

    // If found, send the found exercise in the response.
    response.json({ success: true, exercise: exerciseFromDatabase });
  } catch (error) {
    console.error(error);
    response.status(500).json({ sucess: false, message: error.message });
  }
}

exports.updateExercise = async (request, response) => {
  const { id } = request.params; // Get the id from the url. Example "locahost:5000/exercises/1", in this case the value of id would be 1.
  const {
    title,
    videoUrl,
    isFavorite
  } = request.body;

  try {
    const updatedExercise = await Exercise.findOneAndUpdate({ _id: id }, { title, videoUrl, isFavorite }, // Get exercise that specified by its id and update the its properties.
      {
        new: true, // Options object. If new is set to FALSE, `findOneAndUpdate` will return the document BEFORE
                   // the update is applied. If set to TRUE, `findOneAndUpdate` will return the document AFTER 
                   // the update is appled.
        runValidators: true // Run validations before updating the document for example the required properties
                            // in the schema.
      });

    // If updated successfully, send the updated exercise in the response.
    response.json({ success: true, exercise: updatedExercise });
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

exports.deleteExercise = async (request, response) => {
  const { id } = request.params; // Get the id from the url. Example "locahost:5000/exercises/1", in this case the value of id would be 1.

  try {
    const deletedExercise = await Exercise.findOneAndRemove({ _id: id });

    response.json({ success: true });
  } catch (error) {
      console.error(error);
      
      response.status(500).json({ success: false, message: "Server Error" });
  }
}
