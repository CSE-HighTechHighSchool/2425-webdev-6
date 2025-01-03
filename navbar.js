// navbar.js

function checkUser() {
    // See if user is in localStorage or sessionStorage
    let userData = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userData) {
      // Convert string back to object
      let user = JSON.parse(userData);
  
      // Example: user.firstname and user.lastname from your database
      let firstName = user.firstname || "";
      let lastName  = user.lastname  || "";
  
      // Swap out the navbar buttons
      let signUpBtn = document.getElementById("signUpBtn");
      let loginBtn  = document.getElementById("loginBtn");
  
      // Show the user’s name in place of "Sign Up"
      if (signUpBtn) {
        signUpBtn.textContent = firstName + " " + lastName;
        signUpBtn.href = "#"; // Optionally link to a "Profile" page
      }
  
      // Turn the "Log In" button into "Log Out"
      if (loginBtn) {
        loginBtn.textContent = "Log Out";
        loginBtn.href = "#";  // Prevent navigation
        loginBtn.onclick = function () {
          // Clear everything from storage
          localStorage.removeItem("keepLoggedIn");
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
          
          // Reload page (or redirect) so the navbar updates
          window.location.reload();
        };
      }
    }
  }
  
  // Optional: run checkUser() automatically when page loads
  document.addEventListener("DOMContentLoaded", function() {
    checkUser();
  });
  