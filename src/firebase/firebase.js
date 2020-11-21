import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBdBueC7payb8xFguBFOtcN7vVPN9NIcsg',
  authDomain: 'file-storage-3d408.firebaseapp.com',
  databaseURL: 'https://file-storage-3d408.firebaseio.com',
  projectId: 'file-storage-3d408',
  storageBucket: 'file-storage-3d408.appspot.com',
  messagingSenderId: '499532002779',
  appId: '1:499532002779:web:83363aaa33364d31c4a3fe',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {
  db,
  auth,
};
