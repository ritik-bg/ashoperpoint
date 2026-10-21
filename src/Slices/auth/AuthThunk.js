// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginError, loginSuccess } from './AuthSlice'
import { toast } from 'react-toastify'
import { publicApi } from '../../intercepter'


export const loginUser = (userdata) => async (dispatch) => {
  try {
    const response = await publicApi.post(`/signin`, userdata);
  
    if (response?.data?.success) {
      dispatch(loginSuccess(response.data.data)); 
      return response.data; 
    } else {
      toast.error("Error while logging in: " + (response.data?.msg || ""));
      return null;
    }
  } catch (e) {
    dispatch(loginError(e));
    toast.error("Network or server error while logging in!");
    return null;
  }
};

