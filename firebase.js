import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgUGoftIqjd3QYzNzPszB6flscCq8L3so",
  authDomain: "vision-studios-98516.firebaseapp.com",
  projectId: "vision-studios-98516",
  storageBucket: "vision-studios-98516.firebasestorage.app",
  messagingSenderId: "551292118247",
  appId: "1:551292118247:web:ba64f4ba802b0a39a3ee42",
  measurementId: "G-W48MZLX3RH"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Form submission logic
const form = document.getElementById("quoteForm");
const statusElement = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (statusElement) statusElement.textContent = "Sending request...";

    // Collect values safely without labels attached
    const formData = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      business: document.getElementById("business")?.value.trim() || null,
      website: document.getElementById("website")?.value.trim() || null,
      type: document.getElementById("type")?.value || "",
      budget: document.getElementById("budget")?.value || "",
      description: document.getElementById("description")?.value.trim() || "",
      createdAt: serverTimestamp()
    };

    try {
      // Export (Write-only) to Firestore "quotes" collection
      await addDoc(collection(db, "quotes"), formData);
      if (statusElement) statusElement.textContent = "Quote request submitted successfully!";
      form.reset();
    } catch (error) {
      console.error("Error submitting form: ", error);
      if (statusElement) statusElement.textContent = "Failed to submit. Please try again.";
    }
  });
  }
