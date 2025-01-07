import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref as dbRef, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

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
const storage = getStorage(app);

// ------------------------------------------------------------------------
// 2) Listen for page load, then fetch user data from local/sessionStorage
// ------------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("uploadProfilePicture");
    const fileInput = document.getElementById("profilePictureInput");
    
    uploadBtn.addEventListener("click", async () => {
      // 1) Get current user (from local/session storage or Firebase Auth)
      let userDataStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (!userDataStr) {
        alert("No user logged in!");
        return;
      }
      let userData = JSON.parse(userDataStr);
      const userUID = userData.uid;
  
      // 2) Get the file object from the input
      let file = fileInput.files[0];
      if (!file) {
        alert("Please select an image first!");
        return;
      }
  
      // 3) Upload to Firebase Storage => "profilePictures/<UID>.jpg"
      let storagePath = `profilePictures/${userUID}.jpg`;
      let fileRef = storageRef(storage, storagePath);
  
      try {
        await uploadBytes(fileRef, file);
        // 4) Get the download URL 
        let downloadURL = await getDownloadURL(fileRef);
  
        // 5) Update the user's accountinfo with photoURL
        await update(dbRef(db, `users/${userUID}/accountinfo`), {
          photoURL: downloadURL
        });
  
        // 6) Display the photo right away
        document.getElementById("profilePicture").src = downloadURL;
        alert("Profile picture uploaded!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload photo: " + error.message);
      }
    });
  });