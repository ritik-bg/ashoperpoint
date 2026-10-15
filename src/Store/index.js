import { configureStore } from '@reduxjs/toolkit'
import authslice from "../Slices/auth/AuthSlice"
import allproductslice from "../Slices/allproduct/AllproductSlice";

export const store = configureStore({
  reducer: {
    auth: authslice,
    allProductlist:allproductslice
  },
})
