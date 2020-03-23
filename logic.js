/*
********** STEPS *************
- Create an function constructor for an object that holds quiz questions, answers, and correct answer
- Create global variables
    -total score
    -variables to hold DOM elements
- Create object instances holding quiz questions
- Create a function that displays quiz questions on the UI
- Create a function that checks if the user answered the question correctly
    - If correct
        - Display "correct"
        - Add to score
        - Next question
    - If incorrect
        - Display "incorrect"
        - Subract 5 seconds from the timer
- Create a function that takes user to the next question
    - displays next questions
    - checks if their answer is correct
- Create an initialize function that starts the program over: 
    - displays intro card
    - resets score to zero
    - when start button is clicked quiz is started by calling start quiz function
    - resets timer to 75 seconds
- Create a function that starts the quiz by hiding the intro card and displaying the quiz card
- Create a timer function
    - called in startQuiz function to start timer
    - Countdown from 75 seconds
    - Subtracts 5 seconds if user answers question wrong
    - When time reaches 0 call game over function
- Create a game over function
    - Called if all questions are answered
    - OR called if timer reaches zero
    - Display final score
- High score
    - high score clickable
    - brings user to high score page
    - allows user to save initials and score
- Call initialize function to start program
- Allow user to store their highscore in local storage
*/

var totalScore;
var secondsLeft = 75;
var timerEl = document.getElementById("timer");
var introCardEl = document.getElementById("intro-card");

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



// function for creating new question card element
function addElement() {
    var newCard = document.createElement("div");
    newCard.innerHTML = '<div class="card text-left col-12 col-sm-10 col-md-9 col-lg-6" id = "quiz-card"><div><h2 class="card-title" id="question">Question will go here.</h2><ul><li><button class="btn" id="ans1">A: Answer 1</button></li><li><button class="btn" id="ans2">B: Answer 2</button></li><li><button class="btn" id="ans3">C: Answer 3</button></li><li><button class="btn" id="ans4">D: Answer 4</button></li></ul><div><p><hr><span id="correct-or-not"></span></p></div></div></div>'
    document.body.appendChild(newCard);
}

// function for displaying questions and answers on newly created quiz card element
function displayQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// function for removing quiz card element after it has been answered
function removeElement() {
    var newCard = document.getElementById("quiz-card");
    newCard.parentNode.removeChild(newCard);
}

// function for moving on to the next question or ending the game if there are not more questions left. removes quiz card element before moving on to next question and creating a new element
function nextQuestion(question) {
    if ((qArr.indexOf(question) + 1) < qArr.length) {
        removeElement();
        quizQuestion(qArr[qArr.indexOf(question) + 1]);
    } else {
        console.log("quiz is over!")
        // gameOver();
    }
};

// checks if answer is correct when an answer is clicked on.
// display correct or wrong, if correct move on to next question.
function checkCorrect(question) {
    var quizCardEl = document.getElementById("quiz-card");
    var displayCorrEl = document.getElementById("correct-or-not");
    quizCardEl.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("button")) {
            console.log(event.target.textContent)
            if (event.target.textContent === question.corrAns) {
                displayCorrEl.textContent = "Correct!";
                totalScore++;
                console.log(totalScore);
                nextQuestion(question);
            } else {
                displayCorrEl.textContent = "Wrong!";
                secondsLeft = secondsLeft - 5;
            }
        }
    });
};

// function for each quiz question: create new element, display question in new element, check if answer is correct
function quizQuestion(question) {
    addElement();
    displayQuestion(question);
    checkCorrect(question);
};


// displays quiz card, hides intro card, starts quiz
function startQuiz() {
    introCardEl.classList.add("display-none");
    startTimer();
    quizQuestion(q1);
};

// defines initialize function
function init() {
    totalScore = 0;
    document.getElementById("start-btn").addEventListener("click", startQuiz);
};

// - Create a timer function
//     - Countdown from 75 seconds
//     - Subtracts 5 seconds if user answers question wrong
//     - When time reaches 0 call game over function

function startTimer() {
    var timer = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
            console.log("game over!");
            // gameOver();
        }

    }, 1000);
};

function gameOver() {
    
};

// calls initialze function to start program
init();

