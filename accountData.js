import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getDatabase, ref, get, remove, update
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase config & initialization
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

window.addEventListener("DOMContentLoaded", () => {
  // Load profile data right away
  loadProfile();

  // Grab the reset Xp button
  const resetBtn = document.getElementById("resetXpBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetXPData);
  }

  // Grab the update passwrod button
  const updateBtn = document.getElementById("updatePasswordBtn");
  if (updateBtn) {
    updateBtn.addEventListener("click", handlePasswordUpdate);
  }
});

async function loadProfile() {
  let userDataStr = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!userDataStr) {
    document.getElementById("profileHeader").textContent = "Please log in";
    return;
  }

  let userData = JSON.parse(userDataStr);

  document.getElementById("userName").textContent   =
    (userData.firstname || "") + " " + (userData.lastname || "");
  document.getElementById("userEmail").textContent  = userData.email || "";

  let statsRef = ref(db, `users/${userData.uid}/accountinfo`);

  try {
    let snapshot = await get(statsRef);
    if (snapshot.exists()) {
      let stats = snapshot.val();
      document.getElementById("loginCount").textContent = stats.loginCount ?? 0;
      document.getElementById("xpPoints").textContent   = stats.xpPoints   ?? 0;

      let xpHistory = stats.xpHistory || [];
      window.renderXpChart(xpHistory);
    } else {
      console.log("No stats found for user.");
    }
  } catch (error) {
    console.error("Error retrieving user stats:", error);
  }
}

// -------------- Remove xpPoints, xpHistory, xp from the DB using remove() --------------
async function resetXPData() {
  let userDataStr = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!userDataStr) {
    alert("No user logged in!");
    return;
  }
  let userData = JSON.parse(userDataStr);
  let userUID  = userData.uid;

  // Remove xpPoints, xpHistory, and xp individually
  try {
    await remove(ref(db, `users/${userUID}/accountinfo/xpPoints`));
    await remove(ref(db, `users/${userUID}/accountinfo/xpHistory`));

    alert("All XP data has been reset!");
    // Reload to update display
    loadProfile();
  } catch (error) {
    console.error("Error removing XP data:", error);
    alert("Failed to reset XP data: " + error);
  }

  window.location.reload();
}

// -------------- Handle Password Update --------------
async function handlePasswordUpdate() {
  const currentPassword = document.getElementById("currentPasswordInput").value.trim();
  const newPassword = document.getElementById("newPasswordInput").value.trim();

  if (!currentPassword || !newPassword) {
    alert("Please enter both your current and new passwords.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("No user is logged in!");
    return;
  }

  try {
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    console.log("User re-authenticated successfully.");

    // Update the password
    await updatePassword(user, newPassword);

    // Store an encrypted version in your DB
    let encryptedPw = encryptPassword(newPassword);
    await update(ref(db, `users/${user.uid}/accountinfo`), {
      password: encryptedPw
    });

    document.getElementById("currentPasswordInput").value = "";
    document.getElementById("newPasswordInput").value = "";
    alert("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
    alert("Failed to update password: " + error);
  }
}

function encryptPassword(password) {
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}