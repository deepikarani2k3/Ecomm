import { createSlice } from '@reduxjs/toolkit'

// Initial state for search
const initialState = {
  searchTerm: '',
}

// Search slice for managing search functionality
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Set search term to filter products
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    // Clear search term
    clearSearch: (state) => {
      state.searchTerm = ''
    },
  },
})

export const { setSearchTerm, clearSearch } = searchSlice.actions
export default searchSlice.reducer

