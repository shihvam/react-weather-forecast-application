import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userAuthSlice";

const weatherStore = configureStore({
  reducer : {
    user : userSlice.reducer,
  }
})


export default weatherStore;