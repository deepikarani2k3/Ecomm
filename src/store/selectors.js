// Selector to get all cart items
export const selectCartItems = (state) => state.cart.items

// Selector to get total number of items in cart
export const selectCartItemCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0)
}

// Selector to get total price of all items in cart
export const selectCartTotal = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}

// Selector to get search term
export const selectSearchTerm = (state) => state.search.searchTerm

