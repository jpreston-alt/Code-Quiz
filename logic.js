
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
var quizCardEl = document.getElementById("quiz-card");
var introCardEl = document.getElementById("intro-card");
var displayCorrEl = document.getElementById("correct-or-not");

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
    ['"click"', '"keydown"',"A function that is called when an event occurs", "Both A and B"],
    "A function that is called when an event occurs"
);

var q5 = new Question(
    "Which method stops an event from bubbling up to it's parent elements?",
    ["event.stopPropagation();", "event.preventDefault();", "event.bubbleEvent();", "event.addEventListener();"],
    "event.stopPropagation();"
);

// array of question object instances
var qArr = [q1, q2, q3, q4, q5];

// funtion for displaying questions on UI
function displayQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// checks if answer is correct when an answer is clicked on.
// display correct or wrong, if correct move on to next question.
function checkCorrect(question) {
    quizCardEl.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("button")) {
            console.log(event.target.textContent)
            if (event.target.textContent === question.corrAns) {
                displayCorrEl.textContent = "Correct!";
                totalScore++;
                console.log(totalScore);
                if ((qArr.indexOf(question) + 1) < qArr.length){
                    nextQuestion(qArr[qArr.indexOf(question) + 1]);
                } else {
                    console.log("quiz is over!")
                    secondsLeft = secondsLeft - 5;
                }
            } else {
                displayCorrEl.textContent = "Wrong!";
            }
        }
    });
};

// takes the user to the next question, called in the checkCorrect function
function nextQuestion(question) {
    displayQuestion(question);
    checkCorrect(question);
};

// displays quiz card, hides intro card, starts quiz
function startQuiz() {
    introCardEl.classList.add("display-none");
    quizCardEl.classList.remove("display-none");
    startTimer();
    displayQuestion(q1);
    checkCorrect(q1);
};

// defines initialize function
function init() {
    quizCardEl.classList.add("display-none");
    totalScore = 0;
    document.getElementById("start-btn").addEventListener("click", startQuiz);
};

// - Create a timer function
//     - Countdown from 75 seconds
//     - Subtracts 5 seconds if user answers question wrong
//     - When time reaches 0 call game over function

function startTimer() {
    var timer = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
            console.log("game over!");
        }

    }, 1000);
};

// calls initialze function to start program
init();


