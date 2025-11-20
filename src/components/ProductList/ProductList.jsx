import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useProducts } from '../../hooks/useProducts'
import { selectSearchTerm } from '../../store/selectors'
import { setSearchTerm } from '../../store/slices/searchSlice'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

/**
 * ProductList component
 * Displays a list of products with search functionality
 * Uses custom hook to fetch products and Redux for search filtering
 */
function ProductList() {
  const dispatch = useDispatch()
  
  // Fetch products using custom hook
  const { products, loading, error } = useProducts()
  
  // Get search term from Redux store
  const searchTerm = useSelector(selectSearchTerm)
  
  // Handle search input change - updates Redux state
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    
    const term = searchTerm.toLowerCase()
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    )
  }, [products, searchTerm])

  // Loading state
  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading-message">Loading products...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-message">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Our Products</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        {searchTerm && (
          <p className="search-results">
            Found {filteredProducts.length} product(s) matching "{searchTerm}"
          </p>
        )}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList

