// Define questions for each difficulty level
const questions1 = [
    { question: "What is 2 + 2?", options: ["4", "3", "5", "6"], answer: 0 },
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: 0 },
    { question: "What color is the sky on a clear day?", options: ["Blue", "Green", "Red", "Yellow"], answer: 0 },
    { question: "How many days are in a leap year?", options: ["366", "365", "364", "367"], answer: 0 },
    { question: "What is the boiling point of water in Celsius?", options: ["100", "90", "80", "110"], answer: 0 },
];

const questions2 = [
    { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"], answer: 0 },
    { question: "What is the smallest prime number?", options: ["2", "1", "3", "5"], answer: 0 },
    { question: "What is the square root of 16?", options: ["4", "3", "5", "6"], answer: 0 },
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: 0 },
    { question: "How many continents are there?", options: ["7", "6", "5", "8"], answer: 0 },
];

const questions3 = [
    { question: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"], answer: 0 },
    { question: "What is 12 x 12?", options: ["144", "121", "156", "132"], answer: 0 },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Homer", "Tolkien", "Dante"], answer: 0 },
    { question: "What is the speed of sound in air?", options: ["343 m/s", "300 m/s", "250 m/s", "400 m/s"], answer: 0 },
    { question: "Which planet is closest to the sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: 0 },
];

const questions4 = [
    { question: "What is the derivative of x^2?", options: ["2x", "x^2", "x", "2"], answer: 0 },
    { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Darwin"], answer: 0 },
    { question: "What is the atomic number of carbon?", options: ["6", "12", "8", "4"], answer: 0 },
    { question: "What is the largest desert in the world?", options: ["Antarctica", "Sahara", "Arctic", "Gobi"], answer: 0 },
    { question: "What is the value of pi (approx)?", options: ["3.14", "3.13", "3.15", "3.16"], answer: 0 },
];

const questions5 = [
    { question: "What is the Heisenberg Uncertainty Principle?", options: ["ΔxΔp ≥ ħ/2", "E = mc^2", "F = ma", "P = IV"], answer: 0 },
    { question: "Who developed the theory of relativity?", options: ["Einstein", "Newton", "Hawking", "Bohr"], answer: 0 },
    { question: "What is the function of ribosomes?", options: ["Protein synthesis", "Energy production", "Replication", "Transport"], answer: 0 },
    { question: "What is Planck's constant?", options: ["6.626x10^-34", "3x10^8", "9.8", "1.6x10^-19"], answer: 0 },
    { question: "What is the capital of Uzbekistan?", options: ["Tashkent", "Samarkand", "Bukhara", "Khiva"], answer: 0 },
];

// Map difficulty levels to their respective questions
const difficultyMap = {
    1: questions1,
    2: questions2,
    3: questions3,
    4: questions4,
    5: questions5,
};

// Global variables to manage quiz state
let currentSession = 1;
let currentDifficulty = 3; // Start with difficulty level 3
let currentQuestions = difficultyMap[currentDifficulty];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalScore = 0;
const maxScore = 60; // Maximum possible score: 3 sessions * 5 questions * (difficulty 3 + 4 + 5)
const correctAnswersPerSession = [0, 0, 0]; // Track correct answers per session

// Get DOM elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// Attach event listeners to buttons
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

/**
 * Function to shuffle an array in place using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 */
function shuffle(array) {
    for (let i = array.length -1; i >0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Function to start the quiz
 */
function startQuiz() {
    startContainer.style.display = "none"; // Hide start page
    quizContainer.style.display = "block"; // Show quiz page
    loadQuestion(); // Load the first question
}

/**
 * Function to load the current question and options
 */
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Clone the options to avoid modifying the original
    let shuffledOptions = [...question.options];
    
    // Shuffle the options
    shuffle(shuffledOptions);
    
    // Find the new index of the correct answer
    const correctAnswerText = question.options[question.answer];
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
    
    // Display the question
    questionElement.textContent = `Session ${currentSession}: ${question.question}`;
    
    // Clear previous options
    optionsElement.innerHTML = "";
    
    // Create list items for each option
    shuffledOptions.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(index, newCorrectIndex));
        optionsElement.appendChild(li);
    });
    
    updateProgressBar(); // Update the progress bar
    nextBtn.disabled = true; // Disable Next button until an option is selected
}

/**
 * Function to handle answer selection
 * @param {number} selectedIndex - The index of the selected option
 * @param {number} correctIndex - The index of the correct option after shuffling
 */
function selectAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        correctAnswers++; 
        correctAnswersPerSession[currentSession - 1]++;
    }

    // Highlight the selected option (optional: remove if not desired)
    Array.from(optionsElement.children).forEach((li, index) => {
        li.style.borderBottom = index === selectedIndex ? "3px solid #4CAF50" : "none";
    });

    nextBtn.disabled = false; // Enable Next button after selection
}

/**
 * Function to proceed to the next question or session
 */
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        loadQuestion(); // Load next question in the current session
    } else {
        nextSession(); // Proceed to the next session
    }
}

/**
 * Function to handle transition to the next session
 */
function nextSession() {
    // Calculate total score based on correct answers and difficulty
    totalScore += correctAnswersPerSession[currentSession - 1] * currentDifficulty;
    currentSession++;
    currentQuestionIndex = 0;
    correctAnswers = 0;

    if (currentSession > 3) {
        showResults(); // If all sessions are completed, show results
    } else {
        // Adjust difficulty for the next session based on performance
        if (currentSession === 2) {
            currentDifficulty = correctAnswersPerSession[0] >= 3 ? 4 : 2;
        } else if (currentSession === 3) {
            if (currentDifficulty === 4) {
                currentDifficulty = correctAnswersPerSession[1] >= 3 ? 5 : 2;
            } else {
                currentDifficulty = correctAnswersPerSession[1] >= 3 ? 4 : 1;
            }
        }
        currentQuestions = difficultyMap[currentDifficulty]; // Update questions for new difficulty
        loadQuestion(); // Load the first question of the new session
    }
}

/**
 * Function to display the quiz results
 */
function showResults() {
    quizContainer.style.display = "none"; // Hide quiz page
    resultsContainer.style.display = "block"; // Show results page
    resultsContainer.querySelector("#score").textContent = `Your Score: ${totalScore} / ${maxScore}`;
    visualizeResults(); // Generate charts
}

/**
 * Function to restart the quiz
 */
function restartQuiz() {
    // Reset all global variables to initial state
    currentSession = 1;
    currentDifficulty = 3;
    currentQuestions = difficultyMap[currentDifficulty];
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalScore = 0;
    correctAnswersPerSession.fill(0); // Reset correct answers per session
    resultsContainer.style.display = "none"; // Hide results page
    startContainer.style.display = "flex"; // Show start page
}

/**
 * Function to update the progress bar based on current question
 */
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / 5) * 100; // Calculate progress percentage
    const progressSpan = progressBar.querySelector("span");
    progressSpan.style.width = `${progress}%`; // Update width of the progress bar
    progressSpan.style.backgroundColor = "#4CAF50"; // Set progress bar color
}

/**
 * Function to visualize the quiz results using D3.js
 */
function visualizeResults() {
    const width = 500;
    const height = 400;
    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
    const barColors = ["#4CAF50", "#2196F3", "#FF9800"]; // Colors for each session

    // Remove any existing SVG to prevent duplicates
    d3.select("#charts").selectAll("svg").remove();

    // Create SVG container
    const svg = d3
        .select("#charts")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Define X scale - one band for each session
    const xScale = d3.scaleBand()
        .domain([1, 2, 3]) // Three sessions
        .range([margin.left, width - margin.right])
        .padding(0.3);

    // Define Y scale - based on the number of correct answers
    const yScale = d3.scaleLinear()
        .domain([0, 5]) // Max 5 correct answers per session
        .range([height - margin.bottom, margin.top]);

    // Draw X axis
    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d => `Session ${d}`))
        .attr("font-size", "12px");

    // Draw Y axis
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5))
        .attr("font-size", "12px");

    // Create bars for each session
    svg.selectAll("rect")
        .data(correctAnswersPerSession)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i + 1))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d)) // Calculate bar height
        .attr("fill", (d, i) => barColors[i]);

    // Add labels on top of each bar
    svg.selectAll("text.bar-label")
        .data(correctAnswersPerSession)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (d, i) => xScale(i + 1) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d) - 5) // Position label above the bar
        .attr("text-anchor", "middle")
        .text(d => d);
}
