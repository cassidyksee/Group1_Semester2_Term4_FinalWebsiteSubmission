

// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your Firebase configuration (updated for new project)
const firebaseConfig = {
  apiKey: "AIzaSyDbg9MFTksO6cDn5IoCWxNawlLZUs_zIVg",
  authDomain: "scene-it-2.firebaseapp.com",
  projectId: "scene-it-2",
  storageBucket: "scene-it-2.appspot.com", // ✅ fixed for Auth
  messagingSenderId: "850456497515",
  appId: "1:850456497515:web:184bb91ed6162e7fd8502e",
  measurementId: "G-35G035YKBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- SIGN UP ---
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPass").value;
    console.log("Attempting signup with:", email);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success:", userCredential);
      alert("Account created successfully!");
      
        $("#signupSection").fadeOut(200, function() {
        $("#loginSection").fadeIn(200);
        });

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  });
}

// --- LOGIN ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPass").value;
    console.log("Attempting login with:", email);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success:", userCredential);
      alert("Login successful!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  });
}



