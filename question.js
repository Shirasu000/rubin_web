// script.js
let questions = [];

function loadCSV() {
    Papa.parse("question.csv", {
        download: true,
        complete: function(results) {
            questions = results.data;
            showRandomQuestion();
        }
    });
}

function showRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');
    const feedbackElement = document.getElementById('feedback');

    questionElement.textContent = questions[randomIndex][0];
    answerInput.value = '';
    feedbackElement.textContent = '';
}

function checkAnswer() {
    const answerInput = document.getElementById('answerInput');
    const feedbackElement = document.getElementById('feedback');

    const currentQuestion = document.getElementById('question').textContent;
    const correctAnswer = questions.find(q => q[0] === currentQuestion)[1];

    if (answerInput.value.toLowerCase() === correctAnswer.toLowerCase()) {
        feedbackElement.textContent = '正解です！';
    } else {
        feedbackElement.textContent = '不正解です。もう一度試してみてください。';
    }

    showRandomQuestion();
}

loadCSV();  // ページ読み込み時にCSVデータを読み込む
