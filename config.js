import * as firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyA7SaOECNOqFfwZLoLQ4LmKUL8OE2TYBfQ",
  authDomain: "barter-system-app-e7858.firebaseapp.com",
  projectId: "barter-system-app-e7858",
  storageBucket: "barter-system-app-e7858.appspot.com",
  messagingSenderId: "675090064821",
  appId: "1:675090064821:web:9994dc5a6f343ce5a0a5fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
   
  export default firebase.firestore()
  