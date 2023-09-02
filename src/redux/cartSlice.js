import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: {}
  },
  reducers: {
    addProduct: (state, action) => {
      const { productID, productName, image, price } = action.payload;
    
      if (state.products[productID]) {
        state.products[productID].count += 1;
      } else {
        state.products[productID] = { name: productName, count: 1, image, price };
      }
    },       
    setCart: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      const productID = action.payload;
      if (state.products[productID] && state.products[productID].count > 1) {
        state.products[productID].count -= 1;
      } else {
        delete state.products[productID];
      }
    }
  }
});

export const { addProduct, setCart, removeProduct } = cartSlice.actions;
export const selectCartCount = (state) => Object.keys(state.cart.products).length;
export const selectCartProducts = (state) => state.cart.products;
export const resetCart = () => (dispatch) => { dispatch(setCart({})); };
export default cartSlice.reducer;
