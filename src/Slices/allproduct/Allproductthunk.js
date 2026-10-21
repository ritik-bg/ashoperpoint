import { toast } from 'react-toastify'
import { authApi, publicApi } from '../../intercepter'
import { newCollectionError, newCollectionSuccess, allproductsError, allproductsSuccess } from './AllproductSlice'


export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await authApi.get(`/log/products/list`);
    if (response?.data?.status) {
      dispatch(allproductsSuccess(response.data.data)); 
      return response.data; 
    } else {
      toast.error("Error while getting the data : " + (response.data?.msg || ""));
      return null;
    }
  } catch (e) {
    dispatch(allproductsError(e));
    toast.error("Network or server error while logging in!");
    return null;
  }
};


export const getNewCollections = () => async (dispatch) => {
  try {
    const response = await authApi.get(`/latestCollection`);
    // console.log(response,'reposne')
    if (response?.data?.status) {
      dispatch(newCollectionSuccess(response.data.data)); 
      return response.data; 
    } else {
      toast.error("Error while getting the data : " + (response.data?.msg || ""));
      return null;
    }
  } catch (e) {
    dispatch(newCollectionError(e));
    toast.error("Network or server error while logging in!");
    return null;
  }
};


