// variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const totalScore = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, scoreCounter = 0;
// event listener for start and next button
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  scoreCounter = 0;
  setNextQuestion();
}
// this code selects a random question by shuffling
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
// this code sets whether the answer was correct or incorrect and assigns it to the tally
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
  if (document.body.classList.contains('correct')) {
    scoreCounter++;
    totalScore.innerText = 'Total Score = ' + scoreCounter;
} else {
    scoreCounter -= 1;
    if (scoreCounter < 0) {
        scoreCounter = 0;
    }
    totalScore.innerText = 'Total Score = ' + scoreCounter;
} 
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}



const questions = [
    {
        question: 'Which planet is known as the "Red Planet"?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Mars', correct: true }
        ]
    },
    {
        question: 'Who is the author of the famous play "Romeo and Juliet"?',
        answers: [
            { text: 'Jane Austen', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Charles Dickens', correct: false },
            { text: 'Mark Twain', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'Wt', correct: false },
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'O2', correct: false }
        ]
    },
    {
        question: 'In which country did the Olympic Games originate?',
        answers: [
            { text: 'Greece', correct: true },
            { text: 'Italy', correct: false },
            { text: 'Egypt', correct: false },
            { text: 'China', correct: false }
        ]
    },
    {
        question: 'What is the symbol for the chemical element oxygen??',
        answers: [
            { text: 'Ox', correct: false },
            { text: 'Oc', correct: false },
            { text: 'O2', correct: true },
            { text: 'O', correct: false }
        ]
    },
    {
        question: 'What is the largest mammal on Earth?',
        answers: [
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false },
            { text: ' Blue Whale', correct: true }
        ]
    }

];
  