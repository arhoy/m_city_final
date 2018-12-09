import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBmltWvC8Z8qjQUQ7Rbx1aQtY-9gL4HxLQ",
    authDomain: "reactcity-101.firebaseapp.com",
    databaseURL: "https://reactcity-101.firebaseio.com",
    projectId: "reactcity-101",
    storageBucket: "reactcity-101.appspot.com",
    messagingSenderId: "614974497102"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
}