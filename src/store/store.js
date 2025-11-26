import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        favorite : favoriteReducer,
        user: authReducer,
    },
});

export default store;