
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA44ml3o7Dpb-V_9a8e7OP99GIr_f_rcMQ",
  authDomain: "libreria-8dbba.firebaseapp.com",
  projectId: "libreria-8dbba",
  storageBucket: "libreria-8dbba.firebasestorage.app",
  messagingSenderId: "233740073387",
  appId: "1:233740073387:web:195cc1a4dbad7b1dccbaee"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);