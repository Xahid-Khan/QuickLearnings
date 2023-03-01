// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, where, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBppHBNOXt9PRYAb0Gz-l8ITzkBIrrApC0",
  authDomain: "quick-learnings.firebaseapp.com",
  databaseURL: "https://quick-learnings-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quick-learnings",
  storageBucket: "quick-learnings.appspot.com",
  messagingSenderId: "179810824225",
  appId: "1:179810824225:web:b4a1318715801abd45b360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

let userFound = undefined;

const currentUser = () => {
  if (auth.currentUser && !userFound) {
    getDocs(
      collection(db, "users"),
      where("email", "==", auth.currentUser.email)
      )
      .then((result) => {
          result.forEach((user) => {
            userFound = user.data();
            return userFound;
          })
      })
      .catch((err) => {
          console.log(err);
      })
  }
  return userFound;
}

export {
  auth,
  db,
  currentUser,
}