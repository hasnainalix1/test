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

    let username = '';
    let score = 0;
    let currentQuiz = [];
    let currentQuestionIndex = 0;

    const questions = {
        html: [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
            { question: "Which of the following is correct HTML tag?", options: ["<a>", "</div>", "<section>"], answer: "<a>" },
        ],
        css: [
            { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
            { question: "Which property is used to change the background color in CSS?", options: ["color", "bgcolor", "background-color"], answer: "background-color" },
        ],
        js: [
            { question: "Which company developed JavaScript?", options: ["Google", "Netscape", "Microsoft"], answer: "Netscape" },
            { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#"], answer: "//" },
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
        document.querySelectorAll('.option-btn').forEach((button, index) => {
            button.addEventListener('click', () => {
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