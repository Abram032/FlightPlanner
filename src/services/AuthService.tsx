import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { User } from '../models/User';

export const getUser = (): User | null => {
  const user = firebase.auth().currentUser;

  if(user === null) {
    return null;
  }

  return new User(user.uid, user.displayName ?? "", user.photoURL ?? "");
};

export const isAuthenticated = async (): Promise<boolean> => {
  await GoogleSignin.configure();
  return await GoogleSignin.isSignedIn();
};

export const signIn = async (): Promise<void> => {
  try {
    await GoogleSignin.configure();
    await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    const credential = firebase.auth.GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    if (getUser() !== null) {
      await firebase.auth().signOut();
    }
    await GoogleSignin.configure();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};