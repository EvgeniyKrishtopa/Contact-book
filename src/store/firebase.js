import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD8HSI8eD9HdEGtFtZCdQayV4qTDLi6oH4',
  authDomain: 'contact-book-refactored.firebaseapp.com',
  databaseURL: 'https://contact-book-refactored.firebaseio.com',
  projectId: 'contact-book-refactored',
  storageBucket: 'contact-book-refactored.appspot.com',
  messagingSenderId: '809880163120',
  appId: '1:809880163120:web:37ebdcacba3eb613212ef5',
  measurementId: 'G-EJZWLE5Y7B',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
