// js/utils.js

/**
 * Utility functions for the quiz app
 */
const Utils = {
    /**
     * Show an element by removing the 'hidden' class
     * @param {HTMLElement} element - The element to show
     */
    showElement(element) {
        element.classList.remove('hidden');
    },

    /**
     * Hide an element by adding the 'hidden' class
     * @param {HTMLElement} element - The element to hide
     */
    hideElement(element) {
        element.classList.add('hidden');
    },

    /**
     * Generate a result message based on the score percentage
     * @param {number} score - The user's score
     * @param {number} totalQuestions - The total number of questions
     * @returns {string} - A feedback message
     */
    generateResultMessage(score, totalQuestions) {
        const percentage = (score / totalQuestions) * 100;
        
        if (percentage === 100) {
            return 'Perfect! You are a true genius!';
        } else if (percentage >= 80) {
            return 'Great job! You really know your stuff!';
        } else if (percentage >= 60) {
            return 'Good effort! Keep learning and try again!';
        } else if (percentage >= 40) {
            return 'Not bad. There is room for improvement!';
        } else {
            return 'Keep studying and try again. You can do better!';
        }
    },

    /**
     * Create an option element for the quiz
     * @param {string} optionText - The text of the option
     * @param {Function} clickHandler - The click event handler
     * @returns {HTMLDivElement} - The created option element
     */
    createOptionElement(optionText, clickHandler) {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = optionText;
        
        if (clickHandler) {
            optionElement.addEventListener('click', clickHandler);
        }
        
        return optionElement;
    }
};