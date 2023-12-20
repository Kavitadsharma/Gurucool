const express = require('express');
const router = express.Router();
const quizController = require('../controller/quizController');


// Create a Quiz
router.post('/', quizController.createQuiz);

// Get Active Quiz
router.get('/active',quizController.getActiveQuiz);

// Get Quiz Result
router.get('/:id/result',  quizController.getQuizResult);

// Get All Quizzes
router.get('/all',  quizController.getAllQuizzes);

module.exports = router;
