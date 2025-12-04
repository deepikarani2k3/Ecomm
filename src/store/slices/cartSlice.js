import { createSlice } from '@reduxjs/toolkit'

// Initial state for cart
const initialState = {
  items: [],
}

// Cart slice with reducers for managing cart items
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increment quantity if already exists
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove item from cart completely (fixed to avoid deleting all items)
    removeFromCart: (state, action) => {
      const id = Number(action.payload)   // ⭐ Fix: makes sure ID matches type
      state.items = state.items.filter((item) => item.id !== id)
    },

    // Update quantity of an item (ensures minimum quantity of 1)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
    },

    // Clear all items from cart
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
