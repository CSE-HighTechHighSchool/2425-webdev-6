// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  update,
  get
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMWBCMtjG_AHjuZD_ne1y1tv64DE49xBA",
    authDomain: "moneymindsnj-a2e16.firebaseapp.com",
    databaseURL: "https://moneymindsnj-a2e16-default-rtdb.firebaseio.com/",
    projectId: "moneymindsnj-a2e16",
    storageBucket: "moneymindsnj-a2e16.firebasestorage.app",
    messagingSenderId: "357116733261",
    appId: "1:357116733261:web:5c01f7abb12e82e2baf904"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ---------------------- Sign-In User ---------------------------------------//
document.getElementById("signIn").onclick = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // Log sign-in db


          let logDate = new Date();
          update(ref(db, "users/" + user.uid + "/accountinfo"), {
              last_login: logDate,
          })
          .then(() => {
              // Data saved successfully
              alert("User signed in successfully!");
              
              get(ref(db, "users/" + user.uid + "/accountinfo"))
                  .then((snapshot) => {
                      if (snapshot.exists()) {
                          logIn(snapshot.val());
                      } else {
                          console.log("User does not exist");
                      }
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          }).catch(() => {
              alert(error);
          })
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
};


// ---------------- Keep User Logged In ----------------------------------//
function logIn(user) {
  let keepLoggedIn = document.getElementById("keepLoggedInSwitch").ariaChecked;

  // Session storage is temporary (only while session is active)
  // Information saved as a string (must convert JS object to a string)
  // Session stroage will be cleared with a signOut() function in home.js
  if (!keepLoggedIn) {
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location = "index.html";
  }

  else {
      localStorage.setItem("keepLoggedIn", 'yes');
      localStorage.setItem("user", JSON.stringify(user));
      window.location="index.html";
  }
}