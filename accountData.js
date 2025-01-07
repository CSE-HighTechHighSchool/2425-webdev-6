/* accountData.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getDatabase, ref, get, child
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// ------------------------------------------------------------------------
// 1) Firebase Configuration & Initialization
// ------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyAMWBCMtjG_AHjuZD_ne1y1tv64DE49xBA",
    authDomain: "moneymindsnj-a2e16.firebaseapp.com",
    databaseURL: "https://moneymindsnj-a2e16-default-rtdb.firebaseio.com/",
    projectId: "moneymindsnj-a2e16",
    storageBucket: "moneymindsnj-a2e16.firebasestorage.app",
    messagingSenderId: "357116733261",
    appId: "1:357116733261:web:5c01f7abb12e82e2baf904"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getDatabase(app);

// ------------------------------------------------------------------------
// 2) Listen for page load, then fetch user data from local/sessionStorage
// ------------------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  loadProfile();
});

async function loadProfile() {
  // Check if user is in localStorage or sessionStorage
  let userDataStr = localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!userDataStr) {
    // If no user info, possibly redirect or show a warning
    document.getElementById("profileHeader").textContent = "Please log in";
    return;
  }

  // Parse user object
  let userData = JSON.parse(userDataStr);

  // Display basic info right away
  document.getElementById("userName").textContent   = (userData.firstname || "") + " " + (userData.lastname || "");
  document.getElementById("userEmail").textContent  = userData.email || "";
  
  // We'll read the user's stats from the DB:
  let statsRef = ref(db, `users/${userData.uid}/accountinfo`);

  try {
    let snapshot = await get(statsRef);
    if (snapshot.exists()) {
      let stats = snapshot.val();
      // Show stats
      document.getElementById("loginCount").textContent = stats.loginCount ?? 0;
      document.getElementById("xpPoints").textContent = stats.xpPoints ?? 0;

      let xpHistory = stats.xpHistory || []; 

      // Pass xpHistory to xpChart.js to render the chart
      window.renderXpChart(xpHistory);
    } else {
      console.log("No stats found for user.");
    }
  } catch (error) {
    console.error("Error retrieving user stats:", error);
  }
}
