import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB_eth3ECGknutIeaOahZsMv8vUzh4sgkE",
  authDomain: "instagramclone-62ac6.firebaseapp.com",
  projectId: "instagramclone-62ac6",
  storageBucket: "instagramclone-62ac6.appspot.com",
  messagingSenderId: "702792740978",
  appId: "1:702792740978:web:7bca0c30ea202285ecd2eb",
  measurementId: "G-Y5VPTCYMKN"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// export default db;
