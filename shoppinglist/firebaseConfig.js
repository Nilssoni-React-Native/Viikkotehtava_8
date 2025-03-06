// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxxy5Kg1YA26ipn0hvpI_M-GG0WOeIGbE",
  authDomain: "shoppinglist-a40a3.firebaseapp.com",
  projectId: "shoppinglist-a40a3",
  storageBucket: "shoppinglist-a40a3.firebasestorage.app",
  messagingSenderId: "167383593314",
  appId: "1:167383593314:web:93eb3eeb407082ea7dbc3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };