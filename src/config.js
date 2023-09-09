// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqYLt7C7Ob3Hmz1_sAIwgk-NmgiiRrsNw",
  authDomain: "tune3-e13b3.firebaseapp.com",
  projectId: "tune3-e13b3",
  storageBucket: "tune3-e13b3.appspot.com",
  messagingSenderId: "274659616003",
  appId: "1:274659616003:web:dc437be65d6b525b0f3536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)