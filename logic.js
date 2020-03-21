// ********** STEPS ************* //

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

var qArr = [q1, q2, q3];


// Correlate quiz questions and answers with html
function askQuestion(question) {
    document.getElementById("question").textContent = question.ask;
    for (var i = 0; i < question.answers.length; i++) {
        document.getElementById("ans" + (i + 1)).textContent = question.answers[i];
    }
};

// Define a function that loops through each question and:
    // Displays each question
    // Checks if answer is correct
function nextQuestion() {
    for (var i = 1; i < qArr.length; i++) {
        askQuestion(i);
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


// Create a score variable to hold quiz score
var totalScore;
var contentDiv = document.createElement("div");


// Define a function that displays intro card
function displayIntro() {
    contentDiv.innerHTML = '<div class="card text-center col-12 col-sm-10 col-md-9 col-lg-6"><div class="intro-card"><h1 class="card-title">Coding Quiz Challenge</h1><p class="card-text">Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><button class="btn btn-primary" id="start-btn">Start Quiz</button></div></div>'
    document.body.appendChild(contentDiv);
};

// Define a function that displays quiz questions
function startQuiz() {
    contentDiv.innerHTML = '<div class="card text-left col-12 col-sm-10 col-md-9 col-lg-6"><div class="quiz-card"><h2 class="card-title" id="question">Question will go here.</h2><ul><li><button class="btn" id="ans1">A: Answer 1</button></li><li><button class="btn" id="ans2">B: Answer 2</button></li><li><button class="btn" id="ans3">C: Answer 3</button></li><li><button class="btn" id="ans4">D: Answer 4</button></li></ul></div></div>'
    document.body.appendChild(contentDiv);
    askQuestion(q1);
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


