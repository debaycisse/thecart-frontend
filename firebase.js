// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBow8P4WHtIr8_-p7PySnQ-n4DMaJwdzqo",
  authDomain: "thecart-frontend.firebaseapp.com",
  projectId: "thecart-frontend",
  storageBucket: "thecart-frontend.appspot.com",
  messagingSenderId: "779921824198",
  appId: "1:779921824198:web:5d67031018ade60d9dbac7",
  measurementId: "G-H2S1HC6RTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);