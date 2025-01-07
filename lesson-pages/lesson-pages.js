document.addEventListener('DOMContentLoaded', function() {
    const correctAnswers = {
        q1: 'a',
        q2: 'c',
        q3: 'd',
        q4: 'c'
    };

    const quizForm = document.getElementById('quizForm');
    const resultsDiv = document.getElementById('quizResults');
    const scoreSpan = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let score = 0;
        let feedback = [];

        // Check each answer
        for (let i = 1; i <= 4; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                feedback.push(`Question ${i}: Please select an answer`);
                continue;
            }

            if (selected.value === correctAnswers[`q${i}`]) {
                score++;
                feedback.push(`Question ${i}: Correct!`);
            } else {
                feedback.push(`Question ${i}: Incorrect`);
            }
        }

        // Display results
        scoreSpan.textContent = score;
        feedbackDiv.innerHTML = feedback.map(fb => `<p>${fb}</p>`).join('');
        resultsDiv.classList.remove('d-none');
    });
});