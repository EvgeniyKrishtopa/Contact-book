import firebase from 'firebase/app';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDFDjNeUh_QkS6Zz_kUWxodchtXKMAGT2w",
    authDomain: "contact-book-32fc4.firebaseapp.com",
    databaseURL: "https://contact-book-32fc4.firebaseio.com",
    projectId: "contact-book-32fc4",
    storageBucket: "contact-book-32fc4.appspot.com",
    messagingSenderId: "108838424394",
    appId: "1:108838424394:web:f60fc2ebb793177825bbb3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase
