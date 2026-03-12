
const mainContent=document.querySelector(".mainSection")
const btn = document.getElementById("btn");
const popup = document.querySelector(".section3");
const popupChild = Array.from(popup.children);
const blur = document.querySelector(".blur");
const popup2 = document.querySelector(".section4");
const popupChild2 = Array.from(popup2.children);
const backArrow = document.querySelector(".back-arrow"); // better class
const backArrowRules = document.querySelector(".back-arrow-rules"); // better class
const ruleBox=document.querySelector(".rules-box")
const popup3=document.querySelector(".section5")
const tryButton=document.querySelector(".sample-btn")
const sampleQuiz=document.querySelector(".section6-container")
const backButton=document.getElementById("BackButton");
const loaderWrapper=document.querySelector(".loader-wrapper")
const popingSection2=document.querySelector(".section2 p")
const timer=document.querySelector(".timer");
const blackScreen=document.querySelector(".blackScreen");
const homeSection=document.querySelector(".homeButtonSection");
const homeButton=document.querySelector(".home-button");
const courseSelection = document.querySelectorAll(".section3 a");
const skillLevel = document.querySelectorAll(".section4 a");
const startQuiz=document.querySelector(".start-btn");

homeButton.addEventListener("click",()=>{  
      loaderWrapper.style.display = "flex"; 
    setTimeout(function() {
        loaderWrapper.style.display = "none";
        blackScreen.classList.remove("active");
        homeSection.style.display = "none";
        mainContent.style.display = "block";   
        sampleQuiz.style.display = "none";
        timer.style.display = "none";
        hideAllTooltips();
    },2000) 

})

window.onload = function() {
    loaderWrapper.style.display = "flex"; 
    setTimeout(function() {
        loaderWrapper.style.display = "none";
        popingSection2.style.animation = "pop 1s ease";
    }, 3000);

}

// Open first popup
btn.addEventListener("click", () => {
    popup.style.display = "block";
    popup.classList.remove("closing");
    blur.classList.add("active");
    document.body.style.overflow = "hidden";
});

// Close popup when blur clicked
blur.addEventListener("click", () => {
    if (popup.style.display === "block") popup.classList.add("closing");
    if (popup2.style.display === "block") popup2.classList.add("closing");
    if (popup3.style.display === "block") popup3.classList.add("closing");

    blur.classList.remove("active");
    document.body.style.overflow = "auto";
});

// Hide popup after animation
popup.addEventListener("animationend", (e) => {
    if (e.animationName === "popout") {
        popup.classList.remove("closing");
        popup.style.display = "none";
    }
});

// Open second popup (skip h1 at index 0)
for (let i = 1; i < popupChild.length; i++) {
    popupChild[i].addEventListener("click", () => {
        popup2.style.display = "block";
        popup.style.display = "none";
        popup2.classList.remove("closing");
        
    });
}tryButton.addEventListener("click", (e) => {
    e.preventDefault();

    loaderWrapper.style.display = "flex";


    setTimeout(() => {
             timer.style.display = "flex";
             startTimer(2 * 60); // 2 minutes timer
        questionsSet = new Set();   // Reset set

        while (questionsSet.size < totalQuestions) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            questionsSet.add(questions[randomIndex]);
        }

        // Convert Set to Array
        array = Array.from(questionsSet);

        // Reset quiz state
        userAnswers = new Array(array.length).fill(null);
        currentQuestion = 0;
        markedQuestions = new Set();

        mainContent.style.display = "none";
        sampleQuiz.style.display = "flex";
        loaderWrapper.style.display = "none";

        loadQuestion(currentQuestion);
        renderMarkedQuestions();
        updateProgressBar();

        setTimeout(() => {
            initTooltips();

        }, 200);

    }, 3000);
});
backButton.addEventListener("click",()=>{
    hideAllTooltips()
    loaderWrapper.style.display="flex";
    setTimeout(() => {
        mainContent.style.display = "block";
        sampleQuiz.style.display = "none";
        loaderWrapper.style.display="none";
             timer.style.display = "none";


        
    }, 1000);
})


// Hide popup2 after animation
popup2.addEventListener("animationend", (e) => {
    if (e.animationName === "popout") {
        popup2.classList.remove("closing");
        popup2.style.display = "none";
    }
});
popup3.addEventListener("animationend", (e) => {
    if (e.animationName === "popout") {
        popup3.classList.remove("closing");
        popup3.style.display = "none";
    }
});



// Back button
backArrow.addEventListener("click", () => {
    popup2.style.display = "none";
    popup.style.display = "block";
});


function QuizInstruction(time,question){
    return ` <p><strong>Total Questions:</strong> ${question}</p>
        <p><strong>Total Time:</strong>${time} Minutes</p>
        <p><strong>Passing Marks:</strong> 50%</p>
        <p><strong>Attempts Allowed:</strong> 1</p>
        <p><strong>Negative Marking:</strong> No</p>
        <p class="warning">
            ⚠ Do not refresh the page during the quiz.
        </p>`
}

for (let i = 1; i < popupChild2.length; i++) {

    popupChild2[i].addEventListener("click", (e) => {

        const level = e.target.textContent.trim();

        let time;
        let questions;

        if (level === "Basic") {
            time = 15;
            questions = 15;
        } 
        else if (level === "Intermediate") {
            time = 15;
            questions = 20;
        } 
        else if (level === "Expert") {
            time = 15;
            questions = 30;
        }

        ruleBox.innerHTML = QuizInstruction(time, questions);

        // hide level popup
        popup2.style.display = "none";

        // show rules popup
        popup3.style.display = "block";
    });

}
 
backArrowRules.addEventListener("click", () => {
    popup3.style.display = "none";
    popup2.style.display = "block";
});



const questions = [
    {
        id: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1,
        answerString: "4"
    },
    {
        id: 2,
        question: "Capital of France?",
        options: ["London", "Paris", "Rome", "Berlin"],
        answer: 1,
        answerString: "Paris"
    },
    {
        id: 3,
        question: "5 x 3 = ?",
        options: ["15", "10", "20", "8"],
        answer: 0,
        answerString: "15"
    },
    {
        id: 4,
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "HighText Machine Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Mark"
        ],
        answer: 0,
        answerString: "Hyper Text Markup Language"
    },
    {
        id: 5,
        question: "CSS is used for?",
        options: ["Structure", "Styling", "Database", "Backend"],
        answer: 1,
        answerString: "Styling"
    },
    {
        id: 6,
        question: "JavaScript is?",
        options: ["Programming Language", "Database", "Server", "Browser"],
        answer: 0,
        answerString: "Programming Language"
    },
    {
        id: 7,
        question: "10 / 2 = ?",
        options: ["2", "3", "5", "8"],
        answer: 2,
        answerString: "5"
    },
    {
        id: 8,
        question: "Bootstrap is a?",
        options: ["Library", "Framework", "Database", "API"],
        answer: 1,
        answerString: "Framework"
    },
    {
        id: 9,
        question: "Which is not a JS data type?",
        options: ["String", "Number", "Boolean", "Float"],
        answer: 3,
        answerString: "Float"
    },
    {
        id: 10,
        question: "Array index starts from?",
        options: ["0", "1", "2", "-1"],
        answer: 0,
        answerString: "0"
    }
];

let questionsSet = new Set();
let markedQuestions = new Set();
const totalQuestions = 5;
let currentQuestion = 0;
const nextBtn = document.querySelector(".next-btn");
const submitBtn = document.querySelector(".submit-btn");

// RANDOM 5 QUESTIONS





let array =[];

// IMPORTANT: userAnswers array random questions ke according hona chahiye
let userAnswers =[];

// =====================================
// LOAD QUESTION
// =====================================

function loadQuestion(index) {

    const q = array[index];

    document.querySelector(".demo-question p").innerHTML =
        `<strong>Question No ${index+1}:</strong> ${q.question}`;

    const optionsDiv = document.querySelector(".options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, i) => {

        const checked = userAnswers[index] === i ? "checked" : "";

        optionsDiv.innerHTML += `
            <label class="option">
                <input type="radio" name="demo" class="demo-radio" value="${i}" ${checked}>
                ${option}
            </label>
        `;
    });
    if (index === array.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }

    updateProgressBar();
}

// =====================================
// SAVE ANSWER
// =====================================

document.addEventListener("change", function (e) {
    if (e.target.name === "demo") {
        userAnswers[currentQuestion] = parseInt(e.target.value);
        updateProgressBar();
    }
});

// =====================================
// NEXT BUTTON
// =====================================

document.querySelector(".next-btn").addEventListener("click", function () {

    const answered = userAnswers[currentQuestion] !== null;
    const marked = markedQuestions.has(currentQuestion);

    if (!answered && !marked) {
        alert("Please answer or mark this question before proceeding.");
        return;
    }

    if (currentQuestion < array.length - 1) {   // FIXED
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
});

// =====================================
// PREVIOUS BUTTON
// =====================================

document.querySelector(".previous-btn").addEventListener("click", function () {

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});

// =====================================
// MARK FOR REVIEW
// =====================================

document.querySelector(".flag-btn").addEventListener("click", function () {

    if (markedQuestions.has(currentQuestion)) {
        markedQuestions.delete(currentQuestion);
    } else {
        markedQuestions.add(currentQuestion);
    }

    renderMarkedQuestions();
});

// =====================================
// RENDER MARKED QUESTIONS
// =====================================

function renderMarkedQuestions() {

    const reviewDiv = document.querySelector(".reviewSection");
    reviewDiv.innerHTML = "<h5>Marked Questions:</h5>";

    markedQuestions.forEach(index => {

        reviewDiv.innerHTML += `
            <a href="#" data-index="${index}">
            Question No ${index + 1}   <!-- FIXED -->
            </a>
        `;
    });
}

// =====================================
// CLICK MARKED QUESTION → JUMP
// =====================================

document.querySelector(".reviewSection").addEventListener("click", function (e) {

    if (e.target.dataset.index !== undefined) {
        e.preventDefault();
        currentQuestion = parseInt(e.target.dataset.index);
        loadQuestion(currentQuestion);
    }
});

// =====================================
// PROGRESS BAR
// =====================================

function updateProgressBar() {

    const answeredCount = userAnswers.filter(ans => ans !== null).length;

    const percent = Math.floor((answeredCount / array.length) * 100);  // FIXED

    const bar = document.querySelector(".progress-bar");
    bar.style.width = percent + "%";
    bar.innerText = percent + "%";
}

function resultFunciotn() {
        let score = 0;
        const wrongContainer = document.querySelector(".wrong-answers");
        wrongContainer.innerHTML = "";

        array.forEach((q, index) => {

            if (userAnswers[index] === q.answer) {
                score+=5;
            } else {

                const userAnswerText = userAnswers[index] !== null
                    ? q.options[userAnswers[index]]
                    : "Not Answered";

                wrongContainer.innerHTML += `
                <div style="text-align:left; margin-bottom:10px;">
                    <strong>Question:</strong> ${q.question} <br>
                    <strong>Your Answer:</strong> ${userAnswerText} <br>
                    <strong>Correct Answer:</strong> ${q.options[q.answer]}
                </div>
                <hr>
            `;
            }

        });
        document.querySelector(".score-text").innerText =
            `Your Score: ${score} / ${array.length*5} and Total Percentage is: ${Math.round((score/(array.length*5))*100)}%`;
    
    document.querySelector(".result-box").style.display = "flex";



}

document.querySelector(".submit-btn").addEventListener("click", function () {
if (confirm("Do you really want to submit!!")) {
    resultFunciotn();
     startTimer(0 * 60);
}
else{
        return
    }
    

});
document.querySelector(".close-result").addEventListener("click", function () {
    
    document.querySelector(".result-box").style.display = "none";
    blackScreen.classList.add("active");
    homeSection.style.display = "block";
 
    
});


// =====================================
// INITIAL LOAD
// =====================================
if(array.length>0){
    loadQuestion(currentQuestion);
    renderMarkedQuestions();
}



// intitializing Tooltip
// =====================================
// TOOLTIP INITIALIZATION (SEQUENTIAL)
// =====================================

async function initTooltips() {

    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    for (const el of tooltipElements) {

        // Skip if element is not visible
        if (el.offsetParent === null) {
            console.warn("Skipping hidden element:", el);
            continue;
        }

        await showTooltip(el);
      

    }
}

function showTooltip(element) {

    return new Promise((resolve) => {

        const tooltip = new bootstrap.Tooltip(element, {
            trigger: "manual",
            container: "body"
        });

        tooltip.show();

        setTimeout(() => {
            tooltip.hide();
            setTimeout(resolve, 300);
        }, 3000);

    });
}

function hideAllTooltips() {
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    tooltipElements.forEach(el => {
        const instance = bootstrap.Tooltip.getInstance(el);
        if (instance) {
            instance.hide();
            instance.dispose(); // completely remove
        }
    });
}





let course = "";
let selectedLevel = "";

Array.from(courseSelection).forEach((element) => {

    element.addEventListener("click", function (event) {
      course=event.target.innerText;

    });
});

    skillLevel.forEach((element) => {
        element.addEventListener("click", function (event) {
            selectedLevel = event.target.innerText;
        });
    });

    let timerTimeout = null; 
 function startTimer(time) {

    const minutesEl = document.querySelector(".minutes");
    const secondsEl = document.querySelector(".seconds");

    function updateTimer() {
         if (timerTimeout!=null) {
        clearTimeout(timerTimeout);
    }
        const min = Math.floor(time / 60);
        const sec = time % 60;

        minutesEl.textContent = min < 10 ? "0" + min : min;
        secondsEl.textContent = sec < 10 ? "0" + sec : sec;

        // ORANGE
        if (time <= 120 && time > 60) {
            minutesEl.classList.add("orange");
            secondsEl.classList.add("orange");
        }

        // RED
        if (time <= 60) {
            minutesEl.classList.remove("orange");
            secondsEl.classList.remove("orange");
            minutesEl.classList.add("red");
            secondsEl.classList.add("red");
        }
        if(time>120){
            minutesEl.classList.remove("orange","red");
            secondsEl.classList.remove("orange","red");
             minutesEl.classList.add("green");
            secondsEl.classList.add("green");

        }

        if (time <= 0) {
            resultFunciotn();
            return;
        }

        time--;

        timerTimeout=setTimeout(updateTimer, 1000); // smoother than setInterval
    }

    updateTimer();
}

    startQuiz.addEventListener("click", function () {
        if (course === "" || selectedLevel === "") {
            alert("Please select both course and skill level.");
            return;
        }
        
        else {
            loaderWrapper.style.display = "flex";
             setTimeout(() => {
            loaderWrapper.style.display = "none";              
            getQuestions(course, selectedLevel);
        }, 3000);
        }          
    })


function getQuestions(course, level) {
    let selectedArray;

    if (course === "Pak Studies") {
         let levelQuestions = pakStudiesQuestions.filter(q => q.level === level);

        let totalQuestions = 0;
        if (level === "Basic"){
            totalQuestions = 15;

        } 
        else if (level === "Intermediate"){
            totalQuestions = 20;


        }
        else if (level === "Expert")
             {
            totalQuestions = 30;

            
            }

        // Shuffle and pick totalQuestions
        selectedArray = shuffleArray(levelQuestions).slice(0, totalQuestions);
    } 
    else if (course === "Maths") {
        let levelQuestions = mathsQuestions.filter(q => q.level === level);
        let totalQuestions = 0;
        if (level === "Basic"){
            totalQuestions = 15;

        } 
        else if (level === "Intermediate"){
            totalQuestions = 20;


        }
        else if (level === "Expert")
             {
            totalQuestions = 30;

            
            }

        // Shuffle and pick totalQuestions
        selectedArray = shuffleArray(levelQuestions).slice(0, totalQuestions);
    } 
    else if (course === "General Knowledge") {

        // Filter by level first
        let levelQuestions = generalKnowledgeQuestions.filter(q => q.level === level);

        let totalQuestions = 0;
        if (level === "Basic"){
            totalQuestions = 15;

        } 
        else if (level === "Intermediate"){
            totalQuestions = 20;


        }
        else if (level === "Expert")
             {
            totalQuestions = 30;

            
            }

        // Shuffle and pick totalQuestions
        selectedArray = shuffleArray(levelQuestions).slice(0, totalQuestions);
    } 
    else {
        alert("Invalid Course Selected");
        return;
    }

    if (selectedArray.length === 0) {
        alert("No questions available for this level.");
        return;
    }

    array = selectedArray;
    userAnswers = new Array(array.length).fill(null);
    currentQuestion = 0;
    markedQuestions = new Set();

    mainContent.style.display = "none";
    sampleQuiz.style.display = "flex";
     timer.style.display = "flex";
    startTimer(15 * 60);
    loadQuestion(currentQuestion);
    renderMarkedQuestions();
    updateProgressBar();
}

// Helper function to shuffle an array
function shuffleArray(arr) {
    const array = [...arr]; // copy to avoid modifying original
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}