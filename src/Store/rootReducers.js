import { combineReducers } from "@reduxjs/toolkit";
import authslice from "../Slices/auth/AuthSlice"
import allproductslice from "../Slices/allproduct/AllproductSlice";
import baseApi from "./apislice";

export const rootReducers = combineReducers({
    auth: authslice,
    allProductlist: allproductslice,
    [baseApi.reducerPath]: baseApi.reducer,
})