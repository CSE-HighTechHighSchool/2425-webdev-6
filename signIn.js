// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
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

      let logDate = new Date();

      update(ref(db, "users/" + user.uid + "/accountinfo"), {
        last_login: logDate,
        loginCount: 1, 
      })
        .then(() => {
          update(ref(db, "users/" + user.uid + "/accountinfo"), {
            xpPoints: 185, // total XP
            xpHistory: [
              { date: "2024-10-01", xp: 10 },
              { date: "2024-10-02", xp: 20 },
              { date: "2024-10-03", xp: 35 },
              { date: "2024-10-05", xp: 50 },
              { date: "2024-10-10", xp: 70 }
            ]
          })
            .then(() => {
              alert("User signed in successfully!");
              // Once stats are updated, retrieve user data and finish logging in
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
            })
            .catch((error) => {
              alert("Error initializing XP history: " + error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

// ---------------- Keep User Logged In ----------------------------------//
function logIn(user) {
  let keepLoggedIn = document.getElementById("keepLoggedInSwitch").ariaChecked;

  if (!keepLoggedIn) {
    // Use session storage if user doesn't want to stay logged in
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location = "index.html";
  } else {
    // Use local storage if user wants to stay logged in
    localStorage.setItem("keepLoggedIn", 'yes');
    localStorage.setItem("user", JSON.stringify(user));
    window.location = "index.html";
  }
}
