import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyB6srSMJ45h1Ld-p4b44sGPKba33AmfVQU',
  authDomain: 'testschool-30bdb.firebaseapp.com',
  databaseURL: 'https://testschool-30bdb.firebaseio.com',
  projectId: 'testschool-30bdb',
  storageBucket: 'testschool-30bdb.appspot.com',
  messagingSenderId: '322977217549'
};
firebase.initializeApp(config);

export const storage = firebase.storage;

export default firebase;
