// js/app.js

/**
 * Application initialization - runs when the DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    // Get all DOM elements
    const elements = {
        questionElement: document.getElementById('question'),
        optionsContainer: document.getElementById('options-container'),
        currentQuestionElement: document.getElementById('current-question'),
        totalQuestionsElement: document.getElementById('total-questions'),
        scoreElement: document.getElementById('score'),
        progressBar: document.getElementById('progress'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        restartBtn: document.getElementById('restart-btn'),
        questionContainer: document.getElementById('question-container'),
        resultContainer: document.getElementById('result'),
        finalScoreElement: document.getElementById('final-score'),
        resultMessageElement: document.getElementById('result-message')
    };

    // Initialize the quiz
    const quiz = new Quiz(quizData, elements);
    
    // Log init completion
    console.log('Quiz application initialized successfully!');
});