import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyMGTxr_UIEn68LPs0lpTQou5KYJpLBvk",
  authDomain: "amzn-2-545d9.firebaseapp.com",
  projectId: "amzn-2-545d9",
  storageBucket: "amzn-2-545d9.appspot.com",
  messagingSenderId: "834459139946",
  appId: "1:834459139946:web:f2fddb3dcaff44cd256f13",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
