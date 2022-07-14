const Exercise = require("../models/Exercise");

exports.createExercise = async (request, response) => {
  try {
    const {
      title,
      videoUrl,
      isFavorite
    } = request.body;

    const doesAnExerciseWithTheSubmittedVideoUrlExists = await Exercise.findOne({
      videoUrl
    });

    if (doesAnExerciseWithTheSubmittedVideoUrlExists) {
      response.json({ success: false, message: "An exercise with that video url already exists." });
      return;
    }

    const newExerciseToInsertToTheDatabase = {
      title,
      videoUrl,
      isFavorite
    };

    const createdExercise = await Exercise.create(newExerciseToInsertToTheDatabase);

    response.json({ success: true, exercise: createdExercise });

  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).json({ success: false, message: error.message });
    } else {
      console.error(error);
      
      response.status(500).json({ success: false, message: "Server Error" });
    }
  }
}

exports.getExercises = async (request, response) => {
  try {
    const exercisesFromDatabase = await Exercise.find(); 

    response.json({ success: true, exercises: exercisesFromDatabase });
  } catch (error) {
    console.error(error);
    response.status(500).json({ sucess: false, message: error.message });
  }
}

exports.getExercise = async (request, response) => {
  const { id } = request.params;

  try {
    const exerciseFromDatabase = await Exercise.findOne({ _id: id });

    if (!exerciseFromDatabase) {
      response.status(404).json({ success: false, message: "No exercise found." });
      return;
    }

    response.json({ success: true, exercise: exerciseFromDatabase });
  } catch (error) {
    console.error(error);
    response.status(500).json({ sucess: false, message: error.message });
  }
}

exports.updateExercise = async (request, response) => {
  const { id } = request.params;
  const {
    title,
    videoUrl,
    isFavorite
  } = request.body;

  try {
    const updatedExercise = await Exercise.findOneAndUpdate({ _id: id }, { title, videoUrl, isFavorite },
      {
        new: true, 
        runValidators: true 
      });

    response.json({ success: true, exercise: updatedExercise });
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).json({ success: false, message: error.message });
    } else {
      console.error(error);
      
      response.status(500).json({ success: false, message: "Server Error" });
    }
  }
}

exports.deleteExercise = async (request, response) => {
  const { id } = request.params;

  try {
    const deletedExercise = await Exercise.findOneAndRemove({ _id: id });

    response.json({ success: true });
  } catch (error) {
      console.error(error);
      
      response.status(500).json({ success: false, message: "Server Error" });
  }
}
