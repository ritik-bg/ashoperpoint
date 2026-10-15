import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 allProducts:[],
  newCollection:[],
 error:null
}

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
   
    allproductsSuccess: (state, action) => {
      state.allProducts = action.payload;
      state.error = null;
    },
    allproductsError: (state,error) => {
      state.error = error;
    },
     newCollectionSuccess: (state, action) => {
      state.newCollection = action.payload;
      state.error = null;
    },
    newCollectionError: (state,error) => {
      state.error = error;
    }
  },

})

export const {  allproductsSuccess, allproductsError,newCollectionSuccess,newCollectionError } = allProductsSlice.actions
export default allProductsSlice.reducer
