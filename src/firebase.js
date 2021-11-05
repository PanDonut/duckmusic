// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArKPDEFE6SGWuKhvV8foqBVzvlmaryJko",
    authDomain: "duck-music-39de6.firebaseapp.com",
    projectId: "duck-music-39de6",
    storageBucket: "duck-music-39de6.appspot.com",
    messagingSenderId: "562995977016",
    appId: "1:562995977016:web:9b331ca3addc30497fffcd",
    measurementId: "G-KHPELJE2P5",
    databaseURL: "https://duck-music-39de6-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);