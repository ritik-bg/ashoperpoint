import { combineReducers } from "@reduxjs/toolkit";
import authslice from "../Slices/auth/AuthSlice"
import allproductslice from "../Slices/allproduct/AllproductSlice";
import baseApi from "./apislice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
};


export const rootReducers = combineReducers({
    auth: persistReducer(authPersistConfig, authslice),
    allProductlist: allproductslice,
    [baseApi.reducerPath]: baseApi.reducer,
})