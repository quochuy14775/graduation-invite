// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCpCDBxAGCF_r0z4t3nQneBS3Bh_iUxFY",
    authDomain: "graduation-c5dd2.firebaseapp.com",
    projectId: "graduation-c5dd2",
    storageBucket: "graduation-c5dd2.firebasestorage.app",
    messagingSenderId: "1096267135377",
    appId: "1:1096267135377:web:1e495ebd0d9804b49b4230",
    measurementId: "G-P90YHF845B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
