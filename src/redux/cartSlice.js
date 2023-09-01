import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: {}  
  },
  reducers: {
    addProduct: (state, action) => {
      const { productName, image, price } = action.payload;
          
      if (state.products[productName] && typeof state.products[productName] === 'object') {
        state.products[productName].count += 1;
      } else {
        state.products[productName] = { count: 1, image: image, price: price };
      }
    },    
    setCart: (state, action) => {
      // console.log("setCart action triggered with payload:", action.payload);
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      const productName = action.payload;
      if(state.products[productName] && state.products[productName].count > 1) {
        state.products[productName].count -= 1;
      } else {
        delete state.products[productName];
      }
    }
  }
});

export const { addProduct, setCart, removeProduct } = cartSlice.actions;

export const selectCartCount = (state) => Object.keys(state.cart.products).length;

export const selectCartProducts = (state) => state.cart.products;

export const resetCart = () => (dispatch) => {
  dispatch(setCart({})); 
};

export default cartSlice.reducer;
