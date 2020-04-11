import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBLMvbjAR0fXQtfeRqzMbcP8VsF8w2JwQE",
    authDomain: "delvr-xyz.firebaseapp.com",
    databaseURL: "https://delvr-xyz.firebaseio.com",
    projectId: "delvr-xyz",
    storageBucket: "delvr-xyz.appspot.com",
    messagingSenderId: "731082836585",
    appId: "1:731082836585:web:d488c869e3fd6a941930f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;