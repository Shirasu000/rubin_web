const csvFilePath = 'quiz.csv';

let questions = []; // 問題データを保持する配列
let currentQuestionIndex = -1; // 現在の問題のインデックス

// ウェブページが読み込まれたときに実行される関数
window.onload = function () {
    loadQuestions();
};

// CSVファイルから問題を読み込む関数
function loadQuestions() {
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            // CSVデータを処理してquestions配列に格納
            questions = processData(data);
        })
        .catch(error => console.error('CSVファイルの読み込みエラー:', error));
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

// 問題を表示する関数
function showQuestion() {
    if (questions.length > 0) {
        currentQuestionIndex = Math.floor(Math.random() * questions.length);
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('questionText').textContent = currentQuestion['Question'];
        document.getElementById('userAnswer').value = '';
        document.getElementById('result').textContent = '';
    }
}

// 答えを確認する関数
function checkAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.toLowerCase();
    const correctAnswer = questions[currentQuestionIndex]['Answer'].toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = '正解';
    } else {
        document.getElementById('result').textContent = '不正解';
    }
}


// クリック時に表示切り替えを行う関数
function toggle(element) {
    // hidden要素を取得
    var hidden = element.parentElement.querySelector('.article-hidden');

    // hiddenの表示状態を取得
    var computedStyle = window.getComputedStyle(hidden);
    var displayStyle = computedStyle.getPropertyValue('display');

    // hiddenの表示状態を切り替える
    if (displayStyle === 'none') {
        hidden.style.display = 'block';
        element.classList.add('expanded');
    } else {
        hidden.style.display = 'none';
        element.classList.remove('expanded');
    }
}

// headerを自動表示する
function insert_header(){
    fetch("header.html")
        .then((response) => response.text())
        .then((data) => document.querySelector("#header").innerHTML = data);
}