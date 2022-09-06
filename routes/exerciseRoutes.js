const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')


// App Routes
router.get('/', exerciseController.getExercise)
router.get('/favorite', exerciseController.getFavorite )
router.put('/markFavorite', exerciseController.markFavorite )
router.put('/markUnfavorite', exerciseController.markUnfavorite )

module.exports= router


