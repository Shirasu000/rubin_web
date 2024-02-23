// question.csvのURL（GitHub Raw URLを使用）
const csvUrl = 'question.csv';

let questions = []; // 問題データを保持する配列
let currentQuestionIndex = -1; // 現在の問題のインデックス

// ウェブページが読み込まれたときに実行される関数
window.onload = function () {
    loadQuestions();
    nextQuestion();
};

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
    const lines = csv.split('\n');
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
        document.getElementById('question-text').textContent = currentQuestion['Question'];
        document.getElementById('answer-input').value = '';
        document.getElementById('result').textContent = '';
    }
}

function checkAnswer(){
    document.write('やあ')
}

/* 答えを確認する関数
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.toLowerCase();
    const correctAnswer = questions[currentQuestionIndex]['Answer'].toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = '正解';
    } else {
        document.getElementById('result').textContent = '不正解';
    }
}
*/
