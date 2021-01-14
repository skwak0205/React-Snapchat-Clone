import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAOtrDATjjgqRE3S7yI8-FqCYSplSJKNs4',
  authDomain: 'react-snapchat-clone.firebaseapp.com',
  projectId: 'react-snapchat-clone',
  storageBucket: 'react-snapchat-clone.appspot.com',
  messagingSenderId: '1082637906132',
  appId: '1:1082637906132:web:ca210bcf0eaa443f1e8b41',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
