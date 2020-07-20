import firebase from 'firebase/app';
import 'firebase/database'

import auth from 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyAWZGmstRS9T6pBilHMJs4IGbindscRksc",
    authDomain: "quest-project-cd4a5.firebaseapp.com",
    databaseURL: "https://quest-project-cd4a5.firebaseio.com",
    projectId: "quest-project-cd4a5",
    storageBucket: "quest-project-cd4a5.appspot.com",
    messagingSenderId: "81966034553",
    appId: "1:81966034553:web:61b7ba6d510f94f7b5eea8"
});

export default {
    firebase
}
