// quiz.js

// quiz.csvのURL（GitHub Raw URLを使用）
const csvUrl = 'quiz.csv';

let questions = []; // 問題データを保持する配列
let currentQuestionIndex = -1; // 現在の問題のインデックス

// ウェブページが読み込まれたときに実行される関数
window.onload = function () {
    setupQuizUI();  // クイズのUIを初期化
    loadQuestions();
    nextQuestion();
};

// クイズのUIを初期化する関数
function setupQuizUI() {
    document.getElementById('start-quiz-button').addEventListener('click', startQuiz);
    document.getElementById('submit-answer-button').addEventListener('click', checkAnswer);
    document.getElementById('next-question-button').addEventListener('click', nextQuestion);
}

// CSVファイルから問題を読み込む関数
function loadQuestions() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // CSVデータを処理してquestions配列に格納
            questions = processData(data);
        });
}

// CSVデータを処理して配列に変換する関数
function processData(csv) {
    const lines = csv.split('\r\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }
    return result;
}

// 次の問題を表示する関数
function nextQuestion() {
    if (questions.length > 0) {
        currentQuestionIndex = Math.floor(Math.random() * questions.length);
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question-container').textContent = currentQuestion['Question'];
        document.getElementById('answer-input').value = '';
        document.getElementById('result').textContent = '';
    }
}

// クイズを開始する関数
function startQuiz() {
    loadQuestions();
    nextQuestion();
    document.getElementById('start-quiz-button').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
}

// 答えを確認する関数
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value;
    const correctAnswer = questions[currentQuestionIndex]['Answer'];

    if (userAnswer.localeCompare(correctAnswer, 'ja', { sensitivity: 'base' }) === 0) {
        document.getElementById('result').textContent = '正解！';
    } else {
        document.getElementById('result').textContent = '不正解…';
    }
    document.getElementById('next-question-button').style.display = 'block';
    document.getElementById('submit-answer-button').disabled = true;
}
