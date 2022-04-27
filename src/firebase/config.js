import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBfVSuJjGRjN9APERsvR0jUkZWhz4axS8s",
    authDomain: "vue-blog-system-a144d.firebaseapp.com",
    projectId: "vue-blog-system-a144d",
    storageBucket: "vue-blog-system-a144d.appspot.com",
    messagingSenderId: "141892367303",
    appId: "1:141892367303:web:7c447c3be29028746c1fe2"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// database setup
let db = firebase.firestore();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
    db,
    timestamp
};