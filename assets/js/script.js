//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
    title: "What does the term HTML stand for?",
    choices: ["Huge Text Mega Language", "Hyper Text Markup Language", "How to make Lab ", "Hyper Tool Maker Language"],
    answer: "Hyper Text Markup Language"
},
{
    title: "What tag is used to define an unordered list that is bulleted?",
    choices: ["< ul >", "< s >", "< u >", "< li >"],
    answer: "< ul >"
},
{
    title: " What does the term CSS stand for?",
    choices: ["Controller Style Sheets", "Cascading Super Styler", "Cascading Style Sheets", "None of the above."],
    answer: "Cascading Style Sheets"
},
{
    title: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    choices: ["Else Loop", "While Loop", "Conditional Loop", "For Loop"],
    answer: "For Loop"
},
{
    title: "Which of the following functions let you combine the text of two strings and return a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function startTest() {

timeLeft = 60;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /25!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="startTest()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// - 10 seconds for wrong answer
function incorrect() {
timeLeft -= 10; 
next();
}


function correct() {
score += 5;
next();
}

 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
} 