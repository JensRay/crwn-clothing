import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBBiYgUKmT-jLnusd9SYj2ibwelo7Xg-vk",
  authDomain: "crwn-db-719f3.firebaseapp.com",
  projectId: "crwn-db-719f3",
  storageBucket: "crwn-db-719f3.appspot.com",
  messagingSenderId: "46588988102",
  appId: "1:46588988102:web:c1714f6a1d640eb1aa25c7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;


  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
     const { displayName, email } = userAuth;
     const createAt = new Date();

     try {
       await userRef.set({
         displayName,
         email,
         createAt,
         ...additionalData
       })
     } catch (error) {
       console.log('error creating user', error.message);
     }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;