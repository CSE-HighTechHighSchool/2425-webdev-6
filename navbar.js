// navbar.js

// Check if user is logged in to display username
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
        signUpBtn.href = "/2425-webdev-6/account.html";
      }
  
      // Turn the "Log In" button into "Log Out"
      if (loginBtn) {
        loginBtn.textContent = "Log Out";
        loginBtn.href = "#"; 
        loginBtn.onclick = function () {
          // Clear everything from storage
          localStorage.removeItem("keepLoggedIn");
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
          
          // Reload page so the navbar updates
          window.location.reload();
        };
      }
    }
  }
  
  // Run checkUser() automatically when page loads
  document.addEventListener("DOMContentLoaded", function() {
    checkUser();
  });
  