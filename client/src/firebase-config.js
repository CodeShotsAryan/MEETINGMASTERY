import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmsYnqwfRJiVO4iysgPDHmfM9KVaFAEZw",
    authDomain: "login-62af8.firebaseapp.com",
    projectId: "login-62af8",
    storageBucket: "login-62af8.appspot.com",
    messagingSenderId: "227028682355",
    appId: "1:227028682355:web:5464907d20b18d56f34c06",
    measurementId: "G-W74ZZ8ML7J"
  };

  const app = initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();