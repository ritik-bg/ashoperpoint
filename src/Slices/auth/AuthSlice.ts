// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './AuthThunk'

const initialState: any = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", action.payload.username);
      localStorage.setItem("token", action.payload.token);
      state.error = null;
    },
    loginError: (error) => {
      console.error("error while logging in", error);
    }
  },

})

export const { logout, loginSuccess, loginError } = authSlice.actions
export default authSlice.reducer
