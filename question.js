// script.js
let questions = [];
let currentQuestionIndex = -1;

function loadCSV() {
    fetch('question.csv')
        .then(response => response.text())
        .then(data => {
            questions = Papa.parse(data, { header: true }).data;
            nextQuestion();
        });
}

function showQuestion(index) {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');
    const feedbackElement = document.getElementById('feedback');

    questionElement.textContent = questions[index].Question;
    answerInput.value = '';
    feedbackElement.textContent = '';
}

function checkAnswer() {
    const answerInput = document.getElementById('answerInput');
    const feedbackElement = document.getElementById('feedback');

    const correctAnswer = questions[currentQuestionIndex].Answer;

    if (answerInput.value.toLowerCase() === correctAnswer.toLowerCase()) {
        feedbackElement.textContent = '正解です！';
    } else {
        feedbackElement.textContent = '不正解です。もう一度試してみてください。';
    }
}

function nextQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    showQuestion(currentQuestionIndex);
}

loadCSV();  // ページ読み込み時にCSVデータを読み込む

