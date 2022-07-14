const express = require("express");
const router = express.Router();

const {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise
} = require("../controllers/exerciseController");

router
  .route("/")
  .post(createExercise)
  .get(getExercises); 

router
  .route("/:id")
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;
