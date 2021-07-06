import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9tHkfMqX86fZzXN7lfhFK5zQxUmvz3As",
  authDomain: "cln-22c0f.firebaseapp.com",
  projectId: "cln-22c0f",
  storageBucket: "cln-22c0f.appspot.com",
  messagingSenderId: "580028940956",
  appId: "1:580028940956:web:7ce6654fd88f5d6a772359",
  measurementId: "G-SQM7JD5EQ9"
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
