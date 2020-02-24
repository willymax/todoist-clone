import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConsig = firebase.initializeApp({
    apiKey: "AIzaSyBI467d7Y0Laru8DM5Jd5HqrRxaJYVzG4E",
    authDomain: "todoist-4bf40.firebaseapp.com",
    databaseURL: "https://todoist-4bf40.firebaseio.com",
    projectId: "todoist-4bf40",
    storageBucket: "todoist-4bf40.appspot.com",
    messagingSenderId: "601043838164",
    appId: "1:601043838164:web:96909bd9fceadf02f88741",
    measurementId: "G-S6ZQM2HPPS"
})
export {firebaseConsig as firebase}