
// JS for the navbar.
// Everytime you scroll below a certain amount, a shadow is added to the navbar.
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.getElementById("navbar-extra").style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.102)";
  } else {
    document.getElementById("navbar-extra").style.boxShadow = "none";
  }
}

// Blog modal JS
// Opens up Blog with an animation
document.addEventListener("shown.bs.modal", function (event) {
  const modalBodyElements = event.target.querySelectorAll(".modal-body > *");
  let delay = 0.2;

  modalBodyElements.forEach(element => {
    element.style.animationDelay = `${delay}s`;
    delay += 0.2;
  });
});

document.addEventListener("hidden.bs.modal", function (event) {
  const modalBodyElements = event.target.querySelectorAll(".modal-body > *");

  modalBodyElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(10px)";
  });
});

// Front page modal JS
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
  }
}