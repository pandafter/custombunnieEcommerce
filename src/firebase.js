import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCmwuDwi5BtZtsdTf6v8YhVWZGnfX1kGzo",
  authDomain: "custom-bb3c8.firebaseapp.com",
  projectId: "custom-bb3c8",
  storageBucket: "custom-bb3c8.appspot.com", 
  messagingSenderId: "587318450819",
  appId: "1:587318450819:web:9947f8a5e655cd9dc459b6",
  measurementId: "G-788DWZ7DP3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, firebaseConfig };