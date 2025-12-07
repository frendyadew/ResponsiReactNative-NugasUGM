import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj0-WX7KRGOKsz3rsz2teX-BL9VdHxh-Y",
  authDomain: "pgpb-ionic-2025.firebaseapp.com",
  databaseURL: "https://pgpb-ionic-2025-default-rtdb.firebaseio.com",
  projectId: "pgpb-ionic-2025",
  storageBucket: "pgpb-ionic-2025.firebasestorage.app",
  messagingSenderId: "390750021770",
  appId: "1:390750021770:web:1ec204ceb24f8dfc1da573",
  measurementId: "G-4BLVM7PQ25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth instance
// getAnalytics is not used in this context, so it's omitted
