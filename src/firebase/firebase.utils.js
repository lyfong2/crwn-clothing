import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCbN2xefrLoLczqZY7oDrNyE0--v3pqEqA",
    authDomain: "crwn-db-71d4b.firebaseapp.com",
    databaseURL: "https://crwn-db-71d4b.firebaseio.com",
    projectId: "crwn-db-71d4b",
    storageBucket: "crwn-db-71d4b.appspot.com",
    messagingSenderId: "644879790644",
    appId: "1:644879790644:web:0043e0989861268e821061",
    measurementId: "G-XNY4KKP49G"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;