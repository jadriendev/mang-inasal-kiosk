import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCR-4DZIJHTvOw6852Hxr0tMbo3_eWOUjs",
    authDomain: "mang-inasal-kiosk.firebaseapp.com",
    projectId: "mang-inasal-kiosk",
    storageBucket: "mang-inasal-kiosk.firebasestorage.app",
    messagingSenderId: "574724255885",
    appId: "1:574724255885:web:d80c3554c91b079f5472c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);