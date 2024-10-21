document.addEventListener('DOMContentLoaded', function () {
    const expandArrows = document.querySelectorAll('.expand-arrow');
    expandArrows.forEach(arrow => {
        const curriculumId = arrow.getAttribute('data-bs-target');
        const curriculumElement = document.querySelector(curriculumId);

        // Initialize arrow state
        updateArrowState(arrow, curriculumElement);

        arrow.addEventListener('click', function () {
            setTimeout(() => updateArrowState(arrow, curriculumElement), 10);
        });

        // Add event listener for Bootstrap collapse events
        curriculumElement.addEventListener('hidden.bs.collapse', function () {
            updateArrowState(arrow, curriculumElement);
        });
        curriculumElement.addEventListener('shown.bs.collapse', function () {
            updateArrowState(arrow, curriculumElement);
        });
    });
});

function updateArrowState(arrow, curriculumElement) {
    const isExpanded = curriculumElement.classList.contains('show');
    arrow.classList.toggle('rotate-arrow', isExpanded);
    arrow.closest('.lesson-bar').classList.toggle('expanded', isExpanded);
}