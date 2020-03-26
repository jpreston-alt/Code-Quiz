/*
********** STEPS *************
- Create an function constructor for an object that holds quiz questions, answers, and correct answer
- Create global variables
    -total score
    -variables to hold DOM elements
- Create object instances holding quiz questions
- Create a function that creates a new question card element
- Create a function to remove quiz card element
- Create a function that displays quiz questions on the UI using new question card element
- Create a function that moves the user on to the next question if there are any questions left to ask
    - call remove element function to remove previously answered question card to make room for the question card that's created next
- Create a function that checks if the user answered the question correctly
    - If correct
        - Display "correct"
        - Add to score
        - Call next question function
    - If incorrect
        - Display "incorrect"
        - Subract 5 seconds from the timer
- Create an ask question function that:
    - Calls the create element function
    - Calls the display question function
    - Calls the check if correct function
- Create an initialize function that starts the program over: 
    - displays intro card
    - resets score to zero
    - resets timer to 75
    - when start button is clicked quiz is started by calling start quiz function
- Create a start quiz function handler that 
    - hides the intro card
    - starts the timer
    asks the first question
- Create a timer function
    - Countdown from 75 seconds
    - Subtracts 5 seconds if user answers question wrong
    - When time reaches 0 call finsihed function
- Create a finished function
    - Called if all questions are answered
    - OR called if timer reaches zero
    - Display final score
    - Allow user to input their initials
    - Sav score and input to high score
- High score
    - high score link brings user to high score card
    - user views list of high scores
    - go back button
    - clear high scores button
- Call initialize function to start program
- Allow user to store their highscore in local storage
*/

// define global variables
var timer;
var secondsLeft;
var finalScore;
var highscoreArr = [];
var timerEl = document.getElementById("timer");
var timeHeaderEl = document.getElementById("time-header");
var headerEl = document.getElementById("header");
var introCardEl = document.getElementById("intro-card");
var finalScoreEl = document.getElementById("final-score");
var finishedCardEl = document.getElementById("finished-card");
var highscoreCardEl = document.getElementById("highscores-card");
var submitScoreEl = document.getElementById("submit-high-score");
var viewHighscoreEl = document.getElementById("view-highscore");
var goBackEl = document.getElementById("go-back-btn");
var clearScoresEl = document.getElementById("clear-scores-btn");

// Function constructor for Question object
function Question(ask, answers, corrAns) {
    this.ask = ask;
    this.answers = answers;
    this.corrAns = corrAns;
};

// Instances of Question object
var q1 = new Question(
    "An element that is postitioned relative to it's nearest positioned ancestor has been assigned _______ positioning.",
    ["Static", "Relative", "Absolute", "Fixed"],
    "Absolute"
);

var q2 = new Question(
    "Which display property value allows you to hide an element from view?",
    ["Block", "None", "In-line Block", "Inline"],
    "None"
);

var q3 = new Question(
    "What types of data can be held in an array?",
    ["Strings and numbers", "Objects", "Other Arrays", "All the Above"],
    "All the Above"
);

var q4 = new Question(
    "Which is an example of an event handler?",
    ['"click"', '"keydown"', "A function that is called when an event occurs", "Both A and B"],
    "A function that is called when an event occurs"
);

var q5 = new Question(
    "Which method stops an event from bubbling up to it's parent elements?",
    ["event.stopPropagation();", "event.preventDefault();", "event.bubbleEvent();", "event.addEventListener();"],
    "event.stopPropagation();"
);

// array of question object instances
var qArr = [q1, q2, q3, q4, q5];

// functions for defining which screen is displayed
function displayQuiz() {
    introCardEl.classList.add("display-none");
    finishedCardEl.classList.add("display-none");
    highscoreCardEl.classList.add("display-none");
    headerEl.classList.remove("display-none");
};

function displayIntro() {
    introCardEl.classList.remove("display-none");
    finishedCardEl.classList.add("display-none");
    highscoreCardEl.classList.add("display-none");
    headerEl.classList.remove("display-none");
};

function displayHighscores() {
    headerEl.classList.add("display-none");
    introCardEl.classList.add("display-none");
    finishedCardEl.classList.add("display-none");
    highscoreCardEl.classList.remove("display-none");
};

function displayFinished() {
    headerEl.classList.remove("display-none");
    introCardEl.classList.add("display-none");
    finishedCardEl.classList.remove("display-none");
    highscoreCardEl.classList.add("display-none");
};

// function for creating new question card element
function addElement() {
    var questionCardEl = document.createElement("div");
    questionCardEl.innerHTML = '<div class="card text-left col-12 col-sm-10 col-md-9 col-lg-6" id = "quiz-card"><div><h2 class="card-title" id="question">Question will go here.</h2><ul><li><button class="btn" id="ans1">A: Answer 1</button></li><li><button class="btn" id="ans2">B: Answer 2</button></li><li><button class="btn" id="ans3">C: Answer 3</button></li><li><button class="btn" id="ans4">D: Answer 4</button></li></ul><div><p><span id="correct-or-not"></span></p></div></div></div>'
    document.body.appendChild(questionCardEl);
}

// function for rendering questions and answers on new card element
function renderQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// function for removing question card element if it exists
function removeElement() {
    var questionCardEl = document.getElementById("quiz-card");
    if (questionCardEl !== null) {
        questionCardEl.remove();
    };
};

// when an answer is clicked, check if that answer is correct. if correct move on to next question. if wrong subtract 10 seconds
function checkCorrect(question) {
    var quizCardEl = document.getElementById("quiz-card");
    var displayCorrEl = document.getElementById("correct-or-not");
    quizCardEl.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("button")) {
            if (event.target.textContent === question.corrAns) {
                displayCorrEl.innerHTML = "<hr>Correct!";
                nextQuestion(question);
            } else {
                displayCorrEl.innerHTML = "<hr>Wrong!";
                if((secondsLeft - 10) < 10) {
                    secondsLeft = 1;
                } else {
                    secondsLeft = secondsLeft - 10;
                }   
            }
        }
    });
};

// function for moving on to the next question or ending quiz if questions are finished
function nextQuestion(question) {
    setTimeout(function () {
        removeElement();
        if ((qArr.indexOf(question) + 1) < qArr.length) {
            askQuestion(qArr[qArr.indexOf(question) + 1]);
        } else {
            finishQuiz();
        }
    }, 500)
};

// function for each quiz question: create new element, render question in new element, check if answer is correct
function askQuestion(question) {
    addElement();
    renderQuestion(question);
    checkCorrect(question);
};

// function that gets called when the quiz is finished. displays final score card, hides quiz cards, saves final score 
function finishQuiz() {
    displayFinished();
    finalScoreEl.textContent = secondsLeft;
    clearInterval(timer);
    finalScore = secondsLeft;
};

// defines initialize function
function init() {
    // var storedScores = localStorage.getItem("highscores");
    // highscoreArr = JSON.parse(storedScores);
    
    secondsLeft = 75;
    timerEl.textContent = secondsLeft;
    removeElement();
    clearInterval(timer);
    displayIntro();
};

// Create a timer function

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
            removeElement();
        }
    }, 1000);

};



// Create a function that submits the users high score and takes user to high score screen
function submitHighScore(event) {
    event.preventDefault();

    var initials = document.getElementById("initials-input").value;
    var highscoreLi = document.createElement("li");

    if (initials.trim() !== "") {
        displayHighscores
    ();

        highscoreArr.push({ initials, finalScore });

        highscoreLi.textContent = initials + " - " + finalScore;
        document.getElementById("highscore-list").append(highscoreLi);

        var JSONhighscores = JSON.stringify(highscoreArr);
        localStorage.setItem("highscores", JSONhighscores);
    } 
};

// adds event litsener to start quiz button on intro page
document.getElementById("start-btn").addEventListener("click", function(event) {
    event.preventDefault();
    displayQuiz();
    startTimer();
    askQuestion(q1);
});

// adds event listener to submit score button on quiz finished page
submitScoreEl.addEventListener("click", submitHighScore);

// adds event listener to go back button on high score page
goBackEl.addEventListener("click", function(event) {
    event.preventDefault();
    init();
});

// adds event listener to clear high scores button on high score page
clearScoresEl.addEventListener("click", function(event) {
    event.preventDefault();
    highscoreArr = [];
    document.getElementById("highscore-list").remove();
});

// adds event listener for "view highscore" link
viewHighscoreEl.addEventListener("click", function(event) {
    event.preventDefault();
    displayHighscores();
    removeElement();
})



// calls initialze function to start program
init();

