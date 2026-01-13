import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

const initialstate = {
    cartItems: [],
    errors: null
}

const CartSlice = createSlice({
    name: "Cart",
    initialstate,
    reducers: {
        getCartSuccess: (state, action) => {
            state.items = action.payload;
            state.error = null
        }
    }
})


export const { getCartSuccess } = CartSlice.actions
export default CartSlice.reducer