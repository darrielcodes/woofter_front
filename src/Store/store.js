import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice"
import dogReducer from "../Slices/dogSlice";
import authReducer from "../Slices/authSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        dog: dogReducer,
        auth: authReducer
    }
})