import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const userSlice = createSlice({
    name : 'user',
    
    initialState : {
      userEmail : '',
      userPassword : '',

      user : {
        userEmail : '',
        userPassword : '',
      }
    },
    reducers : {

        signUp : (state, action) => {

          state.userEmail = action.payload.email;
          state.userPassword = action.payload.password
          
         
        },


        logIn :  (state, action) => {
            state.userEmail = action.payload.email;
            state.userPassword = action.payload.password; 

             signInWithEmailAndPassword(auth, state.userEmail, state.userPassword );
        },


        fetchCurrentUser : (state, action) => {
          
          useEffect( () => {

            const unsubscribe =  onAuthStateChanged( auth, (currentUser) => {
             state.user = currentUser;
             console.log(currentUser);
             });

             return () => {
              unsubscribe();
             }

          },[] )

        }

    }
  }
)

export const userActions = userSlice.actions;

export default userSlice;