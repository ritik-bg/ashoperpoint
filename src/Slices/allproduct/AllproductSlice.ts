import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
 products:[],
 error:null
}

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
   
    productsSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    productsError: (state,error) => {
      state.error = error;
    }
  },

})

export const {  productsSuccess, productsError } = allProductsSlice.actions
export default allProductsSlice.reducer
