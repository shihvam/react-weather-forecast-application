import { createContext,  useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from "../firebase";

 const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {

  const [user, setUser] = useState({});
 
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password);
    return true;
  }

  function logOut() {
     signOut(auth);
  }

  useEffect( () => {
    const unsubscribe =  onAuthStateChanged( auth, (currentUser) => {
      console.log('Auth', currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser?.email));
      setUser( currentUser );
    });

    return () => {
      unsubscribe();
    }

  },[] );


  return (
    <userAuthContext.Provider value={{ signUp, logIn , user, logOut }} >
      {children}
    </userAuthContext.Provider>
  )
}

export default userAuthContext;