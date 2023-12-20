const Quiz = require('../Model/Quiz');

// ... (other code)

exports.createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;

    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getActiveQuiz = async (req, res) => {
  try {
    const now = new Date();
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: 'No active quiz at the moment' });
    }

    res.status(200).json({ quiz: activeQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getQuizResult = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const now = new Date();
    const quizEndTime = new Date(quiz.endDate);
    quizEndTime.setMinutes(quizEndTime.getMinutes() + 5);

    if (now < quizEndTime) {
      return res.status(400).json({ message: 'Quiz result not available yet' });
    }

    res.status(200).json({
      correctAnswer: quiz.options[quiz.rightAnswer],
      additionalInfo: 'Add any additional info here if needed',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
