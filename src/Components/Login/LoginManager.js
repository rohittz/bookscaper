import React, { useContext } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';
import "firebase/auth";
import { userContext } from '../../App';
export const initializeFirebaseApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
};
const getIdToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        sessionStorage.setItem('token', idToken);
    }).catch(function (error) {
        // Handle error
    });

}
export const handleGoogleSignIn = () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(providerGoogle)
        .then((result) => {
            const { displayName, photoURL, email } = result.user;
            const signedUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            getIdToken();
            return signedUser;
        }).catch((error) => {
            const { code, message } = error;
            const errorInfo = {
                isErrorOccured: true,
                code: code,
                message: message
            }
            return errorInfo;
        });

}
const updateName = (name) => {
    const currUser = firebase.auth().currentUser;
    currUser.updateProfile({
        displayName: name
    }).then(() => {
    })
        .catch(res => {
            console.log(res);
        })
}
export const handleCreateAccount = (user) => {
    const { email, password } = user;
    if (email && password) {

        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                // we got the user's email and password from login component, now we have to create new user with these information and return
                const signedUser = { ...user };
                signedUser.isSignedIn = true;
                console.log(user.name);
                updateName(user.name);
                signedUser.name = user.name;
                getIdToken();
                return signedUser;
            })
            .catch((error) => {
                const { code, message } = error;
                const errorInfo = {
                    isErrorOccured: true,
                    code: code,
                    message: message
                }
                return errorInfo;
            });
    }
}
export const handleEmailSignIn = (user) => {
    const { email, password } = user;
    if (email && password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const signedUser = { ...user };
                signedUser.name = userCredential.user.displayName;
                signedUser.isSignedIn = true;
                getIdToken();
                return signedUser;
            })
            .catch((error) => {
                const { code, message } = error;
                const errorInfo = {
                    isErrorOccured: true,
                    code: code,
                    message: message
                }
                return errorInfo;
            });
    }
}

