// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginError, loginSuccess, logout } from './AuthSlice'
import { Baseurl } from '../../api.config'
import { toast } from 'react-toastify'
import { publicApi } from '../../intercepter'

interface userdata {
  username: string,
  password: string
}

export const loginUser = (userdata: userdata) => async (dispatch: any) => {
  try {
    const response = await publicApi.post(`/signin`, userdata);
  
    if (response?.data?.success) {
      dispatch(loginSuccess(response.data.data)); 
      return response.data; 
    } else {
      toast.error("Error while logging in: " + (response.data?.msg || ""));
      return null;
    }
  } catch (e: any) {
    dispatch(loginError(e));
    toast.error("Network or server error while logging in!");
    return null;
  }
};

