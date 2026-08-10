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

// Target form using your existing ID "contactForm"
const form = document.getElementById("contactForm");
const statusElement = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (statusElement) statusElement.textContent = "Sending request...";

    // Extract values directly using input 'name' attributes
    const formData = {
      name: form.elements["name"]?.value.trim() || "",
      email: form.elements["email"]?.value.trim() || "",
      business: form.elements["business"]?.value.trim() || null,
      website: form.elements["website"]?.value.trim() || null,
      type: form.elements["type"]?.value || "",
      budget: form.elements["budget"]?.value || "",
      description: form.elements["description"]?.value.trim() || "",
      createdAt: serverTimestamp()
    };

    try {
  // Export (Write-only) to Firestore "quotes" collection
  await addDoc(collection(db, "quotes"), formData);

  // Send to Make.com Webhook for Google Sheets
  fetch("https://hook.eu1.make.com/0g4iiwk46w12vypb2kio3edw2jczr3mi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      createdAt: new Date().toISOString() // Provides a readable date string for Google Sheets
    })
  }).catch(err => console.error("Webhook error:", err));

  if (statusElement) statusElement.textContent = "Quote request submitted successfully";
  form.reset();
} catch (error) {
  console.error("Error submitting form: ", error);
}
  });
}

