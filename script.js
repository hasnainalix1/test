document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('signupLinkLogin');
    const gmailInput = document.getElementById('gmail');
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const loginGmailInput = document.getElementById('loginGmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const signupError = document.getElementById('signupError');
    const loginError = document.getElementById('loginError');
    const htmlCard = document.getElementById('htmlCard');
    const cssCard = document.getElementById('cssCard');
    const jsCard = document.getElementById('jsCard');
    const nextBtn = document.getElementById('nextBtn');
    const questionContainer = document.getElementById('questionContainer');
    const scoreElement = document.getElementById('score');
    const finishBtn = document.getElementById('finishBtn');
    const finalScoreElement = document.getElementById('finalScore');
    const timerElement = document.getElementById('timer'); 

    let username = '';
    let score = 0;
    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 10;

    const questions = {
        html: [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
            { question: "Which of the following is correct HTML tag?", options: ["<a>", "</div>", "<section>"], answer: "<a>" },
            { question: "Which element is used to define an unordered list?", options: ["<ul>", "<li>", "<ol>"], answer: "<ul>" },
            { question: "What does the <title> tag define?", options: ["The name of the webpage", "The background color", "The text on the page"], answer: "The name of the webpage" },
            { question: "What is the correct HTML tag for inserting an image?", options: ["<img>", "<image>", "<src>"], answer: "<img>" },
            { question: "Which element is used to create a hyperlink?", options: ["<a>", "<link>", "<h1>"], answer: "<a>" },
            { question: "What does the <body> tag define?", options: ["Header of the page", "Main content of the page", "Footer of the page"], answer: "Main content of the page" },
            { question: "Which tag is used to create a line break?", options: ["<br>", "<hr>", "<break>"], answer: "<br>" },
        ],
        css: [
            { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
            { question: "Which property is used to change the background color in CSS?", options: ["color", "bgcolor", "background-color"], answer: "background-color" },
            { question: "Which of these is used to select an HTML element by class?", options: [".", "#", "$"], answer: "." },
            { question: "What property is used to change the font size in CSS?", options: ["font-size", "text-size", "font-style"], answer: "font-size" },
            { question: "Which CSS property controls the text color?", options: ["color", "text-color", "background-color"], answer: "color" },
            { question: "Which tag is used to define an unordered list?", options: ["<ul>", "<ol>", "<li>"], answer: "<ul>" },
            { question: "Which of the following is correct CSS syntax?", options: ["color: red;", "color = red;", "color: red"], answer: "color: red;" },
            { question: "How do you select an element with id 'example' in CSS?", options: ["#example", ".example", "example"], answer: "#example" },
        ],
        js: [
            { question: "Which company developed JavaScript?", options: ["Google", "Netscape", "Microsoft"], answer: "Netscape" },
            { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#"], answer: "//" },
            { question: "What does DOM stand for in JavaScript?", options: ["Document Object Model", "Digital Online Manager", "Data Online Management"], answer: "Document Object Model" },
            { question: "Which of the following is a primitive data type in JavaScript?", options: ["string", "object", "array"], answer: "string" },
            { question: "Which function is used to parse a JSON string in JavaScript?", options: ["JSON.parse()", "parseJSON()", "JSON.decode()"], answer: "JSON.parse()" },
            { question: "Which method adds a new item to an array in JavaScript?", options: ["push()", "pop()", "shift()"], answer: "push()" },
            { question: "What is the correct syntax for declaring a variable in JavaScript?", options: ["var x = 10;", "x = 10;", "variable x = 10;"], answer: "var x = 10;" },
            { question: "How do you write an IF statement in JavaScript?", options: ["if (x == 10)", "if x == 10", "if x = 10"], answer: "if (x == 10)" },
        ]
    };

    function showSignupPage() {
        document.getElementById('signupPage').classList.remove('hidden');
        document.getElementById('loginPage').classList.add('hidden');
    }

    function showLoginPage() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('signupPage').classList.add('hidden');
    }

    function showHomePage() {
        document.getElementById('homePage').classList.remove('hidden');
        document.getElementById('loginPage').classList.add('hidden');
    }

    function showQuizPage(quizType) {
        currentQuiz = questions[quizType];
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
        document.getElementById('quizPage').classList.remove('hidden');
        document.getElementById('homePage').classList.add('hidden');
    }

    function displayQuestion() {
        const question = currentQuiz[currentQuestionIndex];
        questionContainer.innerHTML = `
            <p>${question.question}</p>
            ${question.options.map(option => `<button class="option-btn">${option}</button>`).join('')}
        `;
        document.querySelectorAll('.option-btn').forEach((button) => {
            button.addEventListener('click', () => {
                clearInterval(timer); 
                if (button.textContent === question.answer) {
                    score++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < currentQuiz.length) {
                    displayQuestion();
                } else {
                    displayResults();
                }
            });
        });
        startTimer(); 
        nextBtn.classList.add('hidden');
    }

    function startTimer() {
        timeLeft = 10; 
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        if (currentQuestionIndex < currentQuiz.length) {
            displayQuestion();
        } else {
            displayResults();
        }
    }

    function displayResults() {
        document.getElementById('quizPage').classList.add('hidden');
        document.getElementById('resultsPage').classList.remove('hidden');
        finalScoreElement.textContent = `${username}, your score: ${score}/${currentQuiz.length}`;
    }

    signupBtn.addEventListener('click', () => {
        const email = gmailInput.value;
        const name = nameInput.value;
        const password = passwordInput.value;

        if (!email || !name || !password || !email.endsWith('@gmail.com')) {
            alert("Please enter a valid Gmail address and all fields.");
            return;
        }

        const existingUser = localStorage.getItem('user');
        if (existingUser) {
            signupError.style.display = 'block';
            showLoginPage();
            return;
        }

        localStorage.setItem('user', JSON.stringify({ email, name, password }));
        showLoginPage();
    });

    loginBtn.addEventListener('click', () => {
        const email = loginGmailInput.value;
        const password = loginPasswordInput.value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || user.email !== email || user.password !== password) {
            loginError.style.display = 'block';
            return;
        }

        username = user.name;
        showHomePage();
    });

    htmlCard.addEventListener('click', () => showQuizPage('html'));
    cssCard.addEventListener('click', () => showQuizPage('css'));
    jsCard.addEventListener('click', () => showQuizPage('js'));

    finishBtn.addEventListener('click', () => {
        location.reload();
    });

    showSignupPage();
});
