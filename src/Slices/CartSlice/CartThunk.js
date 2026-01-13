import { toast } from 'react-toastify'
import { authApi, publicApi } from '../../intercepter'



export const getCartItems = async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth) return;
    try {

        const response = await authApi.get("/log/cart");
        if (response.data.status) {
            dispatch(getCartSuccess(response.data?.data));
            return response.data;
        } else {
            toast.error(response.data?.msg || "Something Went Wrong!")
        }

    } catch (error) {
        toast.error("errore while getting cart items : ", error)
    }
}

export const addToCartItem = (item) => async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth) return;
    try {
        const response = await authApi.post("/log/addtocart", item);
        if (response.data.status) {
            toast.success("Item added successfully")
            return response.data;
        } else {
            toast.error(response.data?.msg || "Something Went Wrong!")
        }

    } catch (error) {
        toast.error("errore while getting cart items : ", error)
    }
}