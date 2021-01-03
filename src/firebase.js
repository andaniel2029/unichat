import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDeAWid_pYjCNLB9Egc4rGD--zwpSwo1ZE",
  authDomain: "unichat-9994e.firebaseapp.com",
  projectId: "unichat-9994e",
  storageBucket: "unichat-9994e.appspot.com",
  messagingSenderId: "397912532086",
  appId: "1:397912532086:web:d74f7ae82e1537cc53eb57"
});

export const auth = app.auth();
export default app;

