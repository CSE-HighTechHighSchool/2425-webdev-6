// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  get,
  update
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
const db   = getDatabase(app);

// ---------------------- Sign-In User ---------------------------------------//
document.getElementById("signIn").onclick = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const accountRef = ref(db, "users/" + user.uid + "/accountinfo");

      // 1) Get current loginCount
      get(accountRef).then((snapshot) => {
        const info = snapshot.val() || {};
        const currentCount = info.loginCount || 0;

        // 2) Update loginCount => currentCount + 1
        update(accountRef, {
          loginCount: currentCount + 1,
          last_login: new Date().toString(),
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
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("keepLoggedIn", 'yes');
    localStorage.setItem("user", JSON.stringify(user));
  }
  // Redirect to home
  window.location = "index.html";
}
