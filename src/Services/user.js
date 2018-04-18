import { firebase, auth } from '../firebase';

const db = firebase.database();

export const createNewUser = (newUser) => {
    db.ref('users').push(newUser);
}

export const getUserByEmail = (userEmail) => {
    db.ref('users').orderByChild('email').equalTo(userEmail).on('value', (snapshot) => {
        return snapshot.val();
    });
}