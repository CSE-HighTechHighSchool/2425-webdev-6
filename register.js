// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmjra0giylUmWmG4hcwPmSpAeGB85IVCw",
  authDomain: "moneymindsnj.firebaseapp.com",
  databaseURL: "https://moneymindsnj-default-rtdb.firebaseio.com/",
  projectId: "moneymindsnj",
  storageBucket: "moneymindsnj.firebasestorage.app",
  messagingSenderId: "431689123430",
  appId: "1:431689123430:web:b1fc037358b4f172fe4fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// ---------------- Register New User ------------------------------//

document.getElementById('submitData').onclick = function () {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;

  // Firebase requires a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  // Validate user inputs
  if (!validation(firstName, lastName, email, password)) {
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      set(ref(db, 'users/' + user.uid + "/accountinfo"), {
        uid: user.uid,
        email: email,
        password: encryptPassword(password),
        firstname: firstName,
        lastname: lastName,
      })
        .then(() => {
          // Data saved successfully
          alert("User created successfully!");
        })
        .catch((error) => {
          // Error occurred
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str) {
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password) {
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z]+@ctemc\.org$/;


  if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
    alert("Please complete all the fields");
    return false;
  }

  if (!fNameRegex.test(firstName)) {
    alert("The first name should only contain letters");
    return false;
  }

  if (!lNameRegex.test(lastName)) {
    alert("The last name should only contain letters");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return false;
  }

  return true;
}

// --------------- Password Encryption -------------------------------------//
function encryptPassword(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}