import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/*
const firebaseConfig = {
    apiKey: "AIzaSyCKo6iAFke34en7Xqescj7yiW_xRUwlq8s",
    authDomain: "notesapp-f28fa.firebaseapp.com",
    projectId: "notesapp-f28fa",
    storageBucket: "notesapp-f28fa.appspot.com",
    messagingSenderId: "689812196245",
    appId: "1:689812196245:web:b2c1d766d6592de849049c",
    measurementId: "G-4M2RFX8GEV"
  };*/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey, 
  authDomain: process.env.REACT_APP_authDomain, 
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















