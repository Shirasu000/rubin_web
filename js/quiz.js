// quiz.js

// CSVファイルのパス
const csvFilePath = 'question.csv';

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function () {
    // 「問題を出題する」ボタンにクリックイベントを追加
    document.querySelector('button').addEventListener('click', loadQuestion);

    // 「解答を提出する」ボタンにクリックイベントを追加
    document.querySelector('div button').addEventListener('click', checkAnswer);
});

// 問題を出題する処理
function loadQuestion() {
    // CSVファイルから問題を取得
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\r\n').slice(1); // 1行目はヘッダーなので除外
            const randomIndex = Math.floor(Math.random() * lines.length);
            const randomQuestion = lines[randomIndex].split(',');

            // 問題を画面に表示
            const questionText = randomQuestion[0];
            alert(questionText); // 本来はHTML要素を操作して表示するべきですが、簡略化のためアラートを使用
            // 問題ごとに解答を保持
            currentAnswer = randomQuestion[1];
        });
}

// 解答をチェックする処理
function checkAnswer() {
    // ユーザからの入力を取得
    const userAnswer = document.getElementById('userAnswer').value;

    // 解答の比較
    if (userAnswer.trim().toLowerCase() === currentAnswer.trim().toLowerCase()) {
        alert('正解');
    } else {
        alert('不正解');
    }

    // 入力欄をクリア
    document.getElementById('userAnswer').value = '';

    // 「問題を出題する」ボタンを押すことで、新しい問題を出題
    loadQuestion();
}

// 現在の問題の解答を保持する変数
let currentAnswer;
