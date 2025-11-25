import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import searchReducer from './slices/searchSlice'

// Configure Redux store with cart and search reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
})

