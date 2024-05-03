function updateTimer() {
    initializeQuiz();
    document.getElementById('start').style.display = 'none';
    const targetDate = new Date().getTime() + (2 * 60 * 1000);
    const updater = setInterval(updating, 1000);

    function updating() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timing').innerHTML = `${minutes}min ${seconds}sec`;

        if (distance <= 0 || questionIndex==data.length) {
            clearInterval(updater);
            document.getElementById('start').style.display = 'block';
	    endQuiz();
        }
    }
}

const data = [
    {
        heading: "QUESTION 1",
        question: "Which of these women do you like the most?",
        options: ["Kendell Jenner", "Kim Kardashian", "Nora Fatehi", "Jacquline Fernandez"],
        answer: "Nora Fatehi"
    },
    {
        heading: "QUESTION 2",
        question: "Which of these movies do you like the most?",
        options: ["Oppenheimer", "Barbie", "Dunki", "Crew"],
        answer: "Dunki"
    },
    {
        heading: "QUESTION 3",
        question: "Whom will you vote out of these?",
        options: ["Narendra Modi", "Rahul Gandhi", "Lalu Yadav", "Shivraj Singh Chauhan"],
        answer: "Lalu Yadav"
    },
    {
        heading: "QUESTION 4",
        question: "Odd one out",
        options: ["Snake", "Pie", "Women", "Money"],
        answer: "Snake"
    },
    {
        heading: "QUESTION 5",
        question: "Who is the best developer according to you?",
        options: ["Mark Zuckerberg", "Bill Gates", "Steve Wozniak", "Shinoma Hinoda"],
        answer: "Mark Zuckerberg"
    },
];

function initializeQuiz() {
    let score = 0;
    displayQuestion(0, score);
}

function displayQuestion(questionIndex, score) {
    const currentQuestion = data[questionIndex];
    const questionHeadingElement = document.getElementById('heading');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('optionbox');

    questionHeadingElement.textContent = currentQuestion.heading;
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
	optionElement.classList.add('option-button');
        optionElement.addEventListener('click', () => {
            checkAnswer(option, currentQuestion.answer, questionIndex, score);
        });
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption, correctAnswer, questionIndex, score) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    questionIndex++;
    if (questionIndex < data.length) {
        displayQuestion(questionIndex, score);
    } else {
        endQuiz(score);
    }
}

function endQuiz(score) {
    alert(`Quiz ended! You scored ${score}`);
    document.getElementById('start').style.display = 'block';
}
