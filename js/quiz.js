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

(function($) {
    var $nav   = $('#navArea');
    var $btn   = $('.toggle_btn');
    var $mask  = $('#mask');
    var open   = 'open'; // class
    // menu open close
    $btn.on( 'click', function() {
    if ( ! $nav.hasClass( open ) ) {
        $nav.addClass( open );
    } else {
        $nav.removeClass( open );
    }
    });
    // mask close
    $mask.on('click', function() {
    $nav.removeClass( open );
    });
} )(jQuery);

// クリック時に記事の表示を切り替える関数
function toggle(element) {
    // 記事の非表示要素を取得
    var hidden = element.parentElement.querySelector('.article-hidden');

    // 要素の表示状態を取得
    var displayStyle = hidden.style.display || window.getComputedStyle(hidden).display;

    // 要素の表示状態を切り替える
    if (displayStyle === 'none') {
        hidden.style.display = 'block'; // 記事を表示
        element.classList.add('expanded'); // 記事の見出しにクラスを追加してスタイルを変更
    } else {
        hidden.style.display = 'none'; // 記事を非表示
        element.classList.remove('expanded'); // 記事の見出しからクラスを削除してスタイルを元に戻す
    }
}

// タグをクリックしたときに記事をフィルタリングする関数
function toggleTag(tagName, event) {
    var articles = document.querySelectorAll('.article');

    // 選択されたタグの色を変更
    if (event.target.classList.contains('selected-tag')) {
        event.target.classList.remove('selected-tag'); // クリックされたタグの色を解除
        // すべての記事を表示
        articles.forEach(function(article) {
            article.classList.remove('article-hidden'); // 記事の表示状態をリセットして全ての記事を表示
        });
    } else {
        var selectedTag = document.querySelector('.selected-tag');
        if (selectedTag) {
            selectedTag.classList.remove('selected-tag'); // 他のタグの色を解除
        }
        event.target.classList.add('selected-tag'); // クリックされたタグに色を付ける

        // 記事をフィルタリングして表示・非表示を切り替える
        articles.forEach(function(article) {
            var tags = article.querySelectorAll('.tag'); // 記事のタグを取得
            var tags_meta = article.querySelectorAll('.tag-meta'); // 記事のタグを取得
            var tagFound = false;
            tags.forEach(function(tag) {
                if (tag.textContent === tagName) {
                    tagFound = true; // 該当のタグが記事に含まれているかチェック
                }
            });
            tags_meta.forEach(function(tag) {
                if (tag.textContent === tagName) {
                    tagFound = true; // 該当のタグが記事に含まれているかチェック
                }
            });
            if (tagFound) {
                article.classList.remove('article-hidden'); // 該当のタグを持つ記事は表示
            } else {
                article.classList.add('article-hidden'); // 該当のタグを持たない記事は非表示
            }
        });
    }
}


// headerを自動表示する
function insert_header(){
    fetch("header.html")
        .then((response) => response.text())
        .then((data) => document.querySelector("#header").innerHTML = data);
}

$(function(){
    $(".slideshow-slide li").css({"position":"relative"});
    $(".slideshow-slide li").hide().css({"position":"absolute"});
    $(".slideshow-slide li:first").addClass("slide");
    $(".slideshow-slide li:nth-child(2)").css({"display":"block"});
    setInterval(function(){
      var $active = $(".slideshow-slide li.slide");
      var $next = $active.next("li").length?$active.next("li"):$(".slideshow-slide li:first");
      var $nextnext = $next.next("li");
      $active.fadeOut(0).removeClass("slide");
      $next.show().addClass("slide");
      $nextnext.css({"display":"block"});
    },5000);
  });