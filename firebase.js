import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCN3Yw14S15KVAgQIh8M0znTf-AFv4f3Cs",
  authDomain: "amzn-2-1cc45.firebaseapp.com",
  projectId: "amzn-2-1cc45",
  storageBucket: "amzn-2-1cc45.appspot.com",
  messagingSenderId: "476209874866",
  appId: "1:476209874866:web:bc2eb30315d3ecab4746ab",
  measurementId: "G-M5HJJ1DM4N",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
