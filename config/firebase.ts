// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiiT9pLXiFlcPz4KQpQVFNbL3fCy90Bs4",
  authDomain: "chatapp-47b35.firebaseapp.com",
  projectId: "chatapp-47b35",
  storageBucket: "chatapp-47b35.appspot.com",
  messagingSenderId: "509925266285",
  appId: "1:509925266285:web:817175fcdaab32d8ab8064"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db= getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {db, auth, provider}