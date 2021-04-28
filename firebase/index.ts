import firebase from 'firebase/app'
import 'firebase/firestore' // If you need it

const firebaseConfig = {
  apiKey: "AIzaSyD3UuG4kXb9eD5qdPpmdb3amnNuVmI4SoE",
  authDomain: "basic-text-editor-2.firebaseapp.com",
  projectId: "basic-text-editor-2",
  storageBucket: "basic-text-editor-2.appspot.com",
  messagingSenderId: "155963302566",
  appId: "1:155963302566:web:260d74b2ede066d99a4a67"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
