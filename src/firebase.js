// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwG0TchqBVrKfeO6olASN1ctIFxKmhQAU",
    authDomain: "air-quality-monitoring-b8bfd.firebaseapp.com",
    databaseURL: "https://air-quality-monitoring-b8bfd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "air-quality-monitoring-b8bfd",
    storageBucket: "air-quality-monitoring-b8bfd.firebasestorage.app",
    messagingSenderId: "436531632040",
    appId: "1:436531632040:web:0778953d531ffa40e46f9d",
    measurementId: "G-BJFBRDCXHD"
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);