import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA-jjIpmHSJYZFTyF8WJvx-U0cM44Bcl2I",
  authDomain: "zmovies-forum.firebaseapp.com",
  databaseURL: "https://zmovies-forum.firebaseio.com",
  projectId: "zmovies-forum",
  storageBucket: "zmovies-forum.appspot.com",
  messagingSenderId: "771513540734",
  appId: "1:771513540734:web:bafe28ea5dbff285b5b82f",
  measurementId: "G-8CK8QBV9QW"
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firestore = firebaseApp.firestore()

export const auth = firebase.auth()