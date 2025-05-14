// Questions du quiz - Culture Générale
const quizData = [
  {
    question: "Quelle est la capitale de l'Australie ?",
    answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
  },
  {
    question: "Qui a peint 'La Joconde' ?",
    answers: [
      "Michel-Ange",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Léonard de Vinci",
    ],
    correct: 3,
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    answers: [
      "Océan Atlantique",
      "Océan Pacifique",
      "Océan Indien",
      "Océan Arctique",
    ],
    correct: 1,
  },
  {
    question: "En quelle année a eu lieu la Révolution française ?",
    answers: ["1789", "1799", "1792", "1804"],
    correct: 0,
  },
  {
    question: "Quelle planète est surnommée 'la planète rouge' ?",
    answers: ["Vénus", "Jupiter", "Mars", "Saturne"],
    correct: 2,
  },
  {
    question: "Qui a écrit le roman '1984' ?",
    answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
    correct: 1,
  },
  {
    question: "Quel est l'élément chimique dont le symbole est 'Au' ?",
    answers: ["Argent", "Aluminium", "Or", "Arsenic"],
    correct: 2,
  },
  {
    question: "Combien de cordes a une guitare classique ?",
    answers: ["4", "5", "6", "7"],
    correct: 2,
  },
  {
    question:
      "Quel est le pays ayant remporté le plus de Coupes du Monde de football ?",
    answers: ["Allemagne", "Argentine", "Italie", "Brésil"],
    correct: 3,
  },
  {
    question: "Dans quel pays se trouve le Machu Picchu ?",
    answers: ["Chili", "Bolivie", "Pérou", "Équateur"],
    correct: 2,
  },
];

// Variables globales
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// Éléments du DOM
const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startQuizBtn = document.getElementById("startQuizBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const progressBar = document.getElementById("progressBar");
const currentQuestion = document.getElementById("currentQuestion");
const totalQuestionsDisplay = document.getElementById("totalQuestionsDisplay");
const totalQuestions = document.getElementById("totalQuestions");
const finalScore = document.getElementById("finalScore");
const scoreCircle = document.getElementById("scoreCircle");
const scoreMessage = document.getElementById("scoreMessage");
const summaryContent = document.getElementById("summaryContent");

// Initialisation
function init() {
  totalQuestions.textContent = quizData.length;
  totalQuestionsDisplay.textContent = quizData.length;
  userAnswers = new Array(quizData.length).fill(null);

  // Événements
  startQuizBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
  submitBtn.addEventListener("click", submitQuiz);
  restartBtn.addEventListener("click", restartQuiz);
}

// Démarrer le quiz
function startQuiz() {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(quizData.length).fill(null);
  displayQuestion();
}

// Afficher une question
function displayQuestion() {
  const question = quizData[currentQuestionIndex];
  questionText.textContent = question.question;

  // Mettre à jour la progression
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = progress + "%";
  currentQuestion.textContent = currentQuestionIndex + 1;

  // Afficher les réponses
  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer-option";
    answerDiv.innerHTML = `
                    <input type="radio" name="answer" value="${index}" id="answer${index}" class="form-check-input me-2">
                    <label for="answer${index}" class="form-check-label w-100">${answer}</label>
                `;

    // Sélectionner la réponse précédente si elle existe
    if (userAnswers[currentQuestionIndex] === index) {
      answerDiv.querySelector("input").checked = true;
      answerDiv.classList.add("selected");
    }

    answerDiv.addEventListener("click", () => selectAnswer(answerDiv, index));
    answersContainer.appendChild(answerDiv);
  });

  // Gestion des boutons
  prevBtn.classList.toggle("hidden", currentQuestionIndex === 0);
  nextBtn.classList.toggle(
    "hidden",
    currentQuestionIndex === quizData.length - 1
  );
  submitBtn.classList.toggle(
    "hidden",
    currentQuestionIndex !== quizData.length - 1
  );
}

// Sélectionner une réponse
function selectAnswer(selectedDiv, answerIndex) {
  // Désélectionner toutes les réponses
  document.querySelectorAll(".answer-option").forEach((div) => {
    div.classList.remove("selected");
    div.querySelector("input").checked = false;
  });

  // Sélectionner la réponse choisie
  selectedDiv.classList.add("selected");
  selectedDiv.querySelector("input").checked = true;
  userAnswers[currentQuestionIndex] = answerIndex;
}

// Question suivante
function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

// Question précédente
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

// Soumettre le quiz
function submitQuiz() {
  calculateScore();
  displayResults();
}

// Calculer le score
function calculateScore() {
  score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === quizData[index].correct) {
      score++;
    }
  });
}

// Afficher les résultats
function displayResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / quizData.length) * 100);
  scoreCircle.textContent = `${percentage}%`;
  finalScore.textContent = `${score}/${quizData.length}`;

  // Message personnalisé selon le score
  let message = "";
  if (percentage >= 80) {
    message = "Excellent ! Vous maîtrisez très bien JavaScript !";
    scoreCircle.style.background = "#28a745";
  } else if (percentage >= 60) {
    message = "Bien joué ! Vous avez de bonnes bases.";
    scoreCircle.style.background = "#ffc107";
  } else {
    message = "Il faut encore travailler vos connaissances JavaScript.";
    scoreCircle.style.background = "#dc3545";
  }
  scoreMessage.textContent = message;

  // Afficher le résumé des réponses
  displayAnswerSummary();

  // Sauvegarder le score dans localStorage
  const previousScores = JSON.parse(localStorage.getItem("quizScores") || "[]");
  previousScores.push({
    score: percentage,
    date: new Date().toLocaleDateString(),
  });
  localStorage.setItem("quizScores", JSON.stringify(previousScores));
}

// Afficher le résumé des réponses
function displayAnswerSummary() {
  summaryContent.innerHTML = "";

  quizData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correct;

    const summaryItem = document.createElement("div");
    summaryItem.className = `card mb-3 ${
      isCorrect ? "border-success" : "border-danger"
    }`;
    summaryItem.innerHTML = `
                    <div class="card-body">
                        <h6 class="card-title">Question ${index + 1}: ${
      question.question
    }</h6>
                        <p class="mb-1">
                            <strong>Votre réponse :</strong> 
                            <span class="${
                              isCorrect ? "text-success" : "text-danger"
                            }">
                                ${
                                  userAnswer !== null
                                    ? question.answers[userAnswer]
                                    : "Non répondu"
                                }
                            </span>
                        </p>
                        ${
                          !isCorrect
                            ? `
                            <p class="mb-0">
                                <strong>Bonne réponse :</strong> 
                                <span class="text-success">${
                                  question.answers[question.correct]
                                }</span>
                            </p>
                        `
                            : ""
                        }
                    </div>
                `;
    summaryContent.appendChild(summaryItem);
  });
}

// Recommencer le quiz
function restartQuiz() {
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  userAnswers = new Array(quizData.length).fill(null);
  score = 0;
}

// Initialiser l'application
init();
