const express = require("express");
const router = express.Router(); // Create a router

// Import controllers
const {
  createExercise,
  getExercises
} = require("../controllers/exerciseController");

router
  .route("/") // Specify the route we want to attach this controller to.
              // Since we used `app.use("/exercise", exerciseRoutes);` in
              // `server.js`, "/" means "/exercise".
  .post(createExercise)  // If we make a POST request to this route, it will
                         // createExercise will handle the request.
  .get(getExercises);  // If we make a GET request to this route, it will
                       // getExercises will handle the request.

module.exports = router; // Export the router to import it in `server.js`
