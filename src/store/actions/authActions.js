import { ROLE } from '../../components/constant';

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: 'LOGIN' });
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: 'SIGNUP' });
    console.log(firebase.apps.length, ' 12312312');

    var config = {
      apiKey: 'AIzaSyB6srSMJ45h1Ld-p4b44sGPKba33AmfVQU',
      authDomain: 'testschool-30bdb.firebaseapp.com',
      databaseURL: 'https://testschool-30bdb.firebaseio.com',
      projectId: 'testschool-30bdb',
      storageBucket: 'testschool-30bdb.appspot.com',
      messagingSenderId: '322977217549'
    };
    if (firebase.apps.length < 2) {
      firebase.initializeApp(config, 'Secondary');
    }
    firebase
      .app('Secondary')
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role.label || 'Student',
            userId: res.user.uid,
            email: newUser.email,
            studentId: newUser.studentId,
            faculty:
              newUser.role.label === ROLE.Marketing_Manager
                ? 'All'
                : newUser.faculty.label
          });
        return firebase
          .app('Secondary')
          .auth()
          .signOut();
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
