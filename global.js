// Modal Functionality
window.onload = function() {
  var modal = document.getElementById('welcome-modal');
  var closeBtn = document.getElementsByClassName('close-btn')[0];

  // Display the modal after 2 seconds
  setTimeout(function() {
      modal.style.display = 'block';
  }, 2000);

  // Close the modal when the user clicks on <span> (x)
  closeBtn.onclick = function() {
      modal.style.display = 'none';
  }

  // Close the modal when the user clicks anywhere outside of it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }

  // Burger Menu Toggle
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
  });
}
