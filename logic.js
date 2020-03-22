
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
- Create a function that takes user to the next question and checks if it is correct
- Create function that displays intro card and hides the quiz card
- Create a function that starts the quiz by hiding the intro card and displaying the quiz card
- Create an initialize function that starts the program over: 
    - displays intro card
    - resets score to zero
    - when start button is clicked quiz is started by calling start quiz function
- Create a timer function
    - Starts when start quiz button is clicked
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
*/

var totalScore;
var quizCardEl = document.getElementById("quiz-card");
var introCardEl = document.getElementById("intro-card");


function Question(ask, answers, corrAns) {
    this.ask = ask;
    this.answers = answers;
    this.corrAns = corrAns;
};

var q1 = new Question(
    "What is Bug's favorite color?",
    ["red", "blue", "green", "yellow"],
    "green"
);

var q2 = new Question(
    "What is Bug's favorite thing to do?",
    ["eat", "sleep", "walk", "play"],
    "sleep"
);

var q3 = new Question(
    "What is Bug's favorite food?",
    ["cucumbers and peanut butter", "carrots", "dog food", "treats"],
    "cucumbers and peanut butter"
);

// array of question object instances
var qArr = [q1, q2, q3];

// displays questions on UI
function displayQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// checks if answer is correct
function checkCorrect(question) {
    quizCardEl.addEventListener("click", function (event) {
        event.preventDefault();
        var displayCorrEl = document.getElementById("correct-or-not");
        if (event.target.matches("button")) {
            console.log(event.target.textContent)
            if (event.target.textContent === question.corrAns) {
                displayCorrEl.textContent = "Correct!";
                totalScore++;
                console.log(totalScore);
                if ((qArr.indexOf(question) + 1) < qArr.length){
                    nextQuestion(qArr[qArr.indexOf(question) + 1])
                } else {
                    console.log("quiz is over!")
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

// displays intro card, hides quiz card
function displayIntro() {
    quizCardEl.classList.add("display-none"); 
};

// displays quiz card, hides intro card, starts quiz
function startQuiz() {
    introCardEl.classList.add("display-none");
    quizCardEl.classList.remove("display-none");
    displayQuestion(q1);
    checkCorrect(q1);
};

// defines initialize function
function init() {
    displayIntro();
    totalScore = 0;
    document.getElementById("start-btn").addEventListener("click", startQuiz);
};

// calls initialze function to start program
init();


