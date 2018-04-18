import firebase from 'firebase'
import 'firebase/firestore';

import { FIREBASE_CONFIG, TEST_FIREBASE_CONFIG, TESTING } from './config/config';

if (TESTING) {
    const app = firebase.initializeApp(TEST_FIREBASE_CONFIG);
    firebase.firestore(app);
} else {
    const app = firebase.initializeApp(FIREBASE_CONFIG);
    firebase.firestore(app);
}

var provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

export {
    firebase,
    auth,
    provider
}



