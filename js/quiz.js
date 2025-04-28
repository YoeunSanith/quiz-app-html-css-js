// js/Quiz.js

/**
 * Quiz class to handle all quiz functionality
 */
class Quiz {
    /**
     * Create a new Quiz instance
     * @param {Array} quizData - The quiz data containing questions, options and correct answers
     * @param {Object} elements - DOM elements used by the quiz
     */
    constructor(quizData, elements) {
        // Quiz data
        this.quizData = quizData;
        this.totalQuestions = quizData.length;
        
        // Quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = Array(this.totalQuestions).fill(null);
        this.questionAnswered = false;
        
        // DOM elements
        this.elements = elements;
        
        // Initialize
        this.initialize();
    }
    
    /**
     * Initialize the quiz
     */
    initialize() {
        // Set up initial values
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = Array(this.totalQuestions).fill(null);
        
        // Update UI elements
        this.elements.totalQuestionsElement.textContent = this.totalQuestions;
        this.elements.scoreElement.textContent = this.score;
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load the first question
        this.loadQuestion();
        this.updateControls();
        this.updateProgress();
        
        // Show question container, hide result container
        Utils.showElement(this.elements.questionContainer);
        Utils.hideElement(this.elements.resultContainer);
        Utils.showElement(this.elements.nextBtn);
        Utils.showElement(this.elements.prevBtn);
        Utils.hideElement(this.elements.restartBtn);
    }
    
    /**
     * Set up event listeners for buttons
     */
    setupEventListeners() {
        this.elements.prevBtn.addEventListener('click', () => this.prevQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.initialize());
    }
    
    /**
     * Load the current question and options
     */
    loadQuestion() {
        this.questionAnswered = this.userAnswers[this.currentQuestionIndex] !== null;
        
        const currentQuestion = this.quizData[this.currentQuestionIndex];
        this.elements.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
        this.elements.questionElement.textContent = currentQuestion.question;
        
        // Clear options container
        this.elements.optionsContainer.innerHTML = '';
        
        // Add options
        currentQuestion.options.forEach((option, index) => {
            let optionElement;
            
            // If user has already answered this question
            if (this.userAnswers[this.currentQuestionIndex] !== null) {
                optionElement = Utils.createOptionElement(option);
                
                if (index === this.userAnswers[this.currentQuestionIndex]) {
                    optionElement.classList.add('selected');
                    if (index === currentQuestion.correctAnswer) {
                        optionElement.classList.add('correct');
                    } else {
                        optionElement.classList.add('incorrect');
                    }
                } else if (index === currentQuestion.correctAnswer) {
                    optionElement.classList.add('correct');
                }
            } else {
                // Question not answered yet, add click handler
                optionElement = Utils.createOptionElement(option, () => this.selectOption(index));
            }
            
            this.elements.optionsContainer.appendChild(optionElement);
        });
    }
    
    /**
     * Handle option selection
     * @param {number} optionIndex - The index of the selected option
     */
    selectOption(optionIndex) {
        if (this.questionAnswered) return;
        
        const currentQuestion = this.quizData[this.currentQuestionIndex];
        const options = this.elements.optionsContainer.querySelectorAll('.option');
        
        // Clear previous selections
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        options[optionIndex].classList.add('selected');
        
        // Save user's answer
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        this.questionAnswered = true;
        
        // Show correct/incorrect feedback
        if (optionIndex === currentQuestion.correctAnswer) {
            options[optionIndex].classList.add('correct');
            this.score++;
            this.elements.scoreElement.textContent = this.score;
        } else {
            options[optionIndex].classList.add('incorrect');
            options[currentQuestion.correctAnswer].classList.add('correct');
        }
        
        // Enable next button
        this.elements.nextBtn.disabled = false;
        this.updateControls();
    }
    
    /**
     * Go to the next question or show results if at the end
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.updateControls();
            this.updateProgress();
        } else {
            this.showResult();
        }
    }
    
    /**
     * Go to the previous question
     */
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
            this.updateControls();
            this.updateProgress();
        }
    }
    
    /**
     * Update navigation button states
     */
    updateControls() {
        // Disable/enable prev button based on position
        this.elements.prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Change next button text on last question
        if (this.currentQuestionIndex === this.totalQuestions - 1) {
            this.elements.nextBtn.textContent = 'Finish';
        } else {
            this.elements.nextBtn.textContent = 'Next';
        }
        
        // Enable next button only if question is answered or revisiting
        this.elements.nextBtn.disabled = !this.questionAnswered && 
                                        this.userAnswers[this.currentQuestionIndex] === null;
    }
    
    /**
     * Update the progress bar
     */
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
    }
    
    /**
     * Show the quiz results
     */
    showResult() {
        // Hide question container, show result container
        Utils.hideElement(this.elements.questionContainer);
        Utils.showElement(this.elements.resultContainer);
        Utils.hideElement(this.elements.nextBtn);
        Utils.hideElement(this.elements.prevBtn);
        Utils.showElement(this.elements.restartBtn);
        
        // Show final score
        this.elements.finalScoreElement.textContent = `${this.score}/${this.totalQuestions}`;
        
        // Generate and display result message
        const message = Utils.generateResultMessage(this.score, this.totalQuestions);
        this.elements.resultMessageElement.textContent = message;
    }
}