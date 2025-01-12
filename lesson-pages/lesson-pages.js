document.addEventListener("DOMContentLoaded", () => {
    const quizzes = {
        class1: [
            {
                question: "What is the formula for Simple Interest?",
                options: ["A = P(1 + rt)", "A = P(1 + r/n)^nt", "A = P + rt", "A = P(r + t)"],
                correctAnswer: 0
            },
            {
                question: "Which of these is NOT mentioned as a benefit of budgeting?",
                options: ["Controls finances", "Prevents overspending", "Guarantees investment returns", "Helps grow money"],
                correctAnswer: 2
            },
            {
                question: "What is a characteristic of Money Market Accounts?",
                options: ["No minimum balance requirement", "No check writing access", "Lower interest rates than savings accounts", "Higher minimum balance requirements"],
                correctAnswer: 3
            },
            {
                question: "According to the lecture, how many recognized currencies exist worldwide?",
                options: ["150", "160", "180", "200"],
                correctAnswer: 2
            }
        ],
        class2: [
            {
                question: "What are banks primarily described as in the lecture?",
                options: ["Investment firms", "Financial middlemen", "Insurance companies", "Government institutions"],
                correctAnswer: 1
            },
            {
                question: "How much money do experts recommend having in an emergency fund?",
                options: ["1-2 months of expenses", "2-3 months of expenses", "3-6 months of expenses", "6-12 months of expenses"],
                correctAnswer: 2
            },
            {
                question: "Which account type typically does NOT earn interest?",
                options: ["Savings account", "Certificate of Deposit", "Checking account", "Money market account"],
                correctAnswer: 2
            },
            {
                question: "Which factors influence bank interest rates?",
                options: ["Economic conditions only", "Bank policies only", "Bank risk and strategy only", "Economic conditions, bank policies, strategy, and risk"],
                correctAnswer: 3
            }
        ],
        class3: [
            {
                question: "Primary difference between saving and investing?",
                options: [
                    "Saving - buying assets like stocks; investing - money in savings account",
                    "Saving - safe storage with minimal returns; investing - purchasing assets with higher returns/risk",
                    "Saving always yields higher returns than investing",
                    "Saving requires more risk than investing"
                ],
                correctAnswer: 1
            },
            {
                question: "Which is a low-risk investment?",
                options: ["Stocks", "Bonds", "Cryptocurrency", "Real Estate"],
                correctAnswer: 1
            },
            {
                question: "Key benefit of mutual funds?",
                options: [
                    "Guarantee high returns with no risk",
                    "Require large initial investment",
                    "Provide diversification and professional management",
                    "Have no associated fees"
                ],
                correctAnswer: 2
            },
            {
                question: "Why choose bonds over stocks?",
                options: [
                    "Bonds are riskier than stocks",
                    "Bonds provide regular interest payments and lower risk",
                    "Bonds guarantee higher returns than stocks",
                    "Bonds have no maturity date"
                ],
                correctAnswer: 1
            }
        ],
        class4: [
            {
                question: "How does financial planning help according to Slide 2?",
                options: [
                    "By reducing income taxes",
                    "By maximizing investment returns",
                    "By covering needs, preparing for emergencies, and achieving long-term goals",
                    "By eliminating all financial risks"
                ],
                correctAnswer: 2
            },
            {
                question: "What makes a SMART financial goal (Slide 3)?",
                options: [
                    "Simple and minimal",
                    "Specific, measurable, achievable, relevant, and time-bound",
                    "Strategic and money-focused",
                    "Short-term and realistic"
                ],
                correctAnswer: 1
            },
            {
                question: "Which IRA characteristic is correct (Slide 8)?",
                options: [
                    "Traditional IRA taxes contributions immediately",
                    "Roth IRA taxes both contributions and earnings at withdrawal",
                    "Traditional IRA taxes withdrawals of both contributions and earnings",
                    "Both types have the same tax treatment"
                ],
                correctAnswer: 2
            },
            {
                question: "According to Slide 10, what's the best way to balance saving and spending?",
                options: [
                    "Spend everything and save what's left",
                    "Save everything and spend nothing",
                    "Allocate funds for needs, savings, and wants",
                    "Spend without planning"
                ],
                correctAnswer: 2
            }
        ]
    };

    const quizContainer = document.querySelector("#quiz-container");
    const resultsContainer = document.querySelector("#results");
    const submitButton = document.querySelector("#submit-btn");

    const quizId = quizContainer.getAttribute("data-quiz-id");
    const quizQuestions = quizzes[quizId];

    if (!quizQuestions) {
        quizContainer.innerHTML = `<p>Quiz not found!</p>`;
        return;
    }

    function displayQuiz() {
        const quizContent = quizQuestions.map((q, index) => {
            const options = q.options.map((option, i) =>
                `<label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label>`
            ).join("<br>");

            return `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    ${options}
                </div>
            `;
        }).join("");

        quizContainer.innerHTML = quizContent;
    }

    function calculateResults() {
        const userAnswers = Array.from(quizContainer.querySelectorAll("input:checked"));
        let score = 0;

        userAnswers.forEach((answer, index) => {
            if (parseInt(answer.value) === quizQuestions[index].correctAnswer) {
                score++;
            }
        });

        resultsContainer.innerHTML = `
            <h4>Your Score: ${score} / ${quizQuestions.length}</h4>
        `;
    }

    submitButton.addEventListener("click", calculateResults);

    displayQuiz();
});
