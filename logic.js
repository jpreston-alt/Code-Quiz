// ********** STEPS ************* //

// Create a score variable to hold quiz score
var totalScore;
var quizCardEl = document.getElementById("quiz-card");
var introCardEl = document.getElementById("intro-card");

// Create an function constructor for an object that holds quiz questions, answers, and correct answer

function Question(ask, answers, corrAns) {
    this.ask = ask;
    this.answers = answers;
    this.corrAns = corrAns;
};

// Create object instances
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


// Correlate quiz questions and answers with html
function displayQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// Define a function that loops through each question and:
    // Displays each question
    // Checks if answer is correct
function questionsLoop() {
    var qArr = [q1, q2, q3];
    for (var i = 0; i < qArr.length; i++) {
        displayQuestion(i);
    }
}


// Define a function that checks if the user answered the question correctly
    // If correct 
        // Display "correct"
        // Add to score
        // Next question
    // If incorrect
        // Display "incorrect"
        // Subract 5 seconds from the timer

function checkCorrect(question) {
    quizCardEl.addEventListener("click", function (event) {
        event.preventDefault();
        var displayCorrEl = document.getElementById("correct-or-not");
        if (event.target.matches("button")) {
            console.log(event.target.textContent)
            if (event.target.textContent === question.corrAns) {
                displayCorrEl.textContent= "Correct!"
            } else {
                displayCorrEl.textContent= "Wrong!";
            }
        } 
    });
}


// Define a function that displays intro card
function displayIntro() {
    quizCardEl.classList.add("display-none"); 
};

// Define a function that starts quiz by displaying first quiz question
function startQuiz() {
    introCardEl.classList.add("display-none");
    quizCardEl.classList.remove("display-none");
    displayQuestion(q1);
    checkCorrect(q1);
};


// Define an initialize function that starts the program over: displays intro card, resets score to zero, if start button is clicked quiz is started
function init() {
    displayIntro();
    totalScore = 0;
    document.getElementById("start-btn").addEventListener("click", startQuiz);
};


// Define a timer function
    // Starts when start quiz button is clicked
    // Countdown from 75 seconds
    // Subtracts 5 seconds if user answers question wrong
    // When time reaches 0 call game over function

// Define a game over function
    // Called if all questions are answered 
    // OR called if timer reaches zero
    // Display final score
    // Allow user to saves initials and score


// Call initialze function
init();


