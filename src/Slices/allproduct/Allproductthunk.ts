import { toast } from 'react-toastify'
import { authApi, publicApi } from '../../intercepter'
import { productsError, productsSuccess } from './AllproductSlice'


export const getAllProducts = () => async (dispatch: any) => {
  try {
    const response = await authApi.get(`/log/products/list`);
    if (response?.data?.status) {
      dispatch(productsSuccess(response.data.data)); 
      return response.data; 
    } else {
      toast.error("Error while getting the data : " + (response.data?.msg || ""));
      return null;
    }
  } catch (e: any) {
    dispatch(productsError(e));
    toast.error("Network or server error while logging in!");
    return null;
  }
};

