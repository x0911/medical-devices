import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCEZHaZ1BzjarYp6ljeP5ytqC1R6NvLsuc",
  authDomain: "medroidx.firebaseapp.com",
  databaseURL: "https://medroidx.firebaseio.com",
  projectId: "medroidx",
  storageBucket: "medroidx.appspot.com",
  messagingSenderId: "784809837436",
  appId: "1:784809837436:web:58d385c213dd40d822daf9",
  measurementId: "G-FM20K98H7B",
};

firebase.initializeApp(config);
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .then(() => {
    // console.log("Multi Tab Persistance");
  })
  .catch((error) => {
    if (error.code == "failed-precondition") {
      // console.log(
      //   "Multiple tabs open, persistence can only be enabled in one tab at a a time."
      // );
    } else if (error.code == "unimplemented") {
      // console.log(
      //   "The current browser does not support all of the features required to enable persistence"
      // );
    }
  });

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const currentUser = auth.currentUser;

const items = db.collection("items");

export { firebase, auth, db, storage, storageRef, currentUser, items };
