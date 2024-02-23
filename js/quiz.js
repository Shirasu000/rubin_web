// quiz.js

const csvUrl = 'quiz.csv';
let questions = [];
let currentQuestionIndex = -1;

window.onload = function () {
    setupQuizUI(); // クイズのUIを初期化
};

function setupQuizUI() {
    document.querySelector('#start-quiz-button').addEventListener('click', startQuiz);
    document.querySelector('#submit-answer-button').addEventListener('click', checkAnswer);
    document.querySelector('#next-question-button').addEventListener('click', nextQuestion);
}

function startQuiz() {
    loadQuestions().then(() => {
        nextQuestion();
        document.querySelector('#start-quiz-button').style.display = 'none';
        document.querySelector('#quiz-container').style.display = 'block';
    });
}

function loadQuestions() {
    return fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            questions = processData(data);
        });
}

function nextQuestion() {
    if (questions.length > 0) {
        currentQuestionIndex = Math.floor(Math.random() * questions.length);
        const currentQuestion = questions[currentQuestionIndex];
        document.querySelector('#question-container').textContent = currentQuestion['Question'];
        document.querySelector('#answer-input').value = '';
        document.querySelector('#result').textContent = '';
        document.querySelector('#next-question-button').style.display = 'none';
        document.querySelector('#submit-answer-button').disabled = false;
    }
}

function checkAnswer() {
    const userAnswer = document.querySelector('#answer-input').value;
    const correctAnswer = questions[currentQuestionIndex]['Answer'];

    if (userAnswer.localeCompare(correctAnswer, 'ja', { sensitivity: 'base' }) === 0) {
        document.querySelector('#result').textContent = '正解！';
    } else {
        document.querySelector('#result').textContent = '不正解…';
    }

    document.querySelector('#next-question-button').style.display = 'block';
    document.querySelector('#submit-answer-button').disabled = true;
}
