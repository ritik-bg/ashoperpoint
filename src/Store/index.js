import { configureStore } from '@reduxjs/toolkit'
import baseApi from './apislice';
import { rootReducers } from './rootReducers';

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware)
  }
})
