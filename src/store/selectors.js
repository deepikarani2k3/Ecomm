// Cart selectors
export const selectCartItems = (state) => state.cart?.items ?? [];

export const selectCartItemCount = (state) => {
  const items = state.cart?.items ?? [];
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};

export const selectCartTotal = (state) => {
  const items = state.cart?.items ?? [];
  return items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );
};

// Search selectors
export const selectSearchTerm = (state) => state.search?.searchTerm ?? '';
