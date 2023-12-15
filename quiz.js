const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
        { text: "var", correct: true },
        { text: "int", correct: false },
        { text: "string", correct: false },
        { text: "variable", correct: false },
    ],
},
{
    question: "What is the purpose of the `addEventListener` method in JavaScript?",
    answers: [
        { text: "To add a new HTML element", correct: false },
        { text: "To create an event listener for a specific event and execute a function", correct: true },
        { text: "To change the style of an element", correct: false },
        { text: "To append text to a paragraph", correct: false },
    ],
},
{
    question: "What does the `JSON` acronym stand for in JavaScript?",
    answers: [
        { text: "JavaScript Object Notation", correct: true },
        { text: "JavaScript Oriented Numbers", correct: false },
        { text: "JavaScript and Object Networking", correct: false },
        { text: "Java Server Object Notation", correct: false },
    ],
},
{
    question: "How is a single-line comment written in JavaScript?",
    answers: [
        { text: "// This is a comment", correct: true },
        { text: "/* This is a comment */", correct: false },
        { text: "-- This is a comment", correct: false },
        { text: "# This is a comment", correct: false },
    ],
},
{
    question: "What is the purpose of the `setTimeout` function in JavaScript?",
    answers: [
        { text: "To set the current time", correct: false },
        { text: "To pause the execution of a function for a specified time", correct: true },
        { text: "To set a timer for a specific date", correct: false },
        { text: "To set a time limit for the entire script", correct: false },
    ],
},
{
    question: "Which operator is used for strict equality in JavaScript?",
    answers: [
        { text: "===", correct: true },
        { text: "==", correct: false },
        { text: "!==", correct: false },
        { text: "!=", correct: false },
    ],
},
{
    question: "What is the purpose of the `this` keyword in JavaScript?",
    answers: [
        { text: "To refer to the current object", correct: true },
        { text: "To create a new variable", correct: false },
        { text: "To declare a function", correct: false },
        { text: "To access the previous element", correct: false },
    ],
},
{
    question: "How can you convert a string to an integer in JavaScript?",
    answers: [
        { text: "parseInt()", correct: true },
        { text: "convertToInt()", correct: false },
        { text: "stringToNumber()", correct: false },
        { text: "toInt()", correct: false },
    ],
},
{
    question: "What is the purpose of the `map` function in JavaScript?",
    answers: [
        { text: "To create a new array with the results of calling a provided function on every element", correct: true },
        { text: "To iterate over the properties of an object", correct: false },
        { text: "To filter elements in an array based on a condition", correct: false },
        { text: "To merge two arrays", correct: false },
    ],
},
{
    question: "What does the acronym DOM stand for in JavaScript?",
    answers: [
        { text: "Document Object Model", correct: true },
        { text: "Data Object Model", correct: false },
        { text: "Document Oriented Model", correct: false },
        { text: "Dynamic Object Model", correct: false },
    ],
},
  ];
  

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("time-display");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
    
  function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      showQuestion();
  }
  
  function showQuestion() {
      restState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
      // Reset the timer display
      timerElement.textContent = 60;
  
      currentQuestion.answers.forEach(answer => {
          const button = document.createElement("button");
          button.innerHTML = answer.text;
          button.classList.add("btn");
          answerButtons.appendChild(button);
          if (answer.correct) {
              button.dataset.correct = answer.correct;
          }
          button.addEventListener("click", selectAnswer);
      });
  
      // Set a timer for 60 seconds
      let timeRemaining = 60;
      timer = setInterval(() => {
          timeRemaining--;
          timerElement.textContent = timeRemaining;
  
          if (timeRemaining <= 0) {
              handleNextButton(); // Move to the next question after the timer expires
          }
      }, 1000); // Update the timer every second
  }
  
  function restState() {
      clearInterval(timer); // Clear the previous timer
      nextButton.style.display = "none";
      while (answerButtons.firstChild) {
          answerButtons.removeChild(answerButtons.firstChild);
      }
  }
  
  function selectAnswer(e) {
      clearTimeout(timer); // Clear the timer when an answer is selected
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
          selectedBtn.classList.add("correct");
          score++;
      } else {
          selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button => {
          if (button.dataset.correct === "true") {
              button.classList.add("correct");
          }
          button.disabled = true;
      });
      nextButton.style.display = "block";
  }
  
  function showScore() {
      restState();
      questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML = "Play Again";
      nextButton.style.display = "block";
  }
  
  function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          showQuestion();
      } else {
          showScore();
      }
  }
  
  nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
          handleNextButton();
      } else {
          startQuiz();
      }
  });
  
  startQuiz();