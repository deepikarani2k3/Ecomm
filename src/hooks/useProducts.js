import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch products from API
 * Handles loading state and error handling
 * @returns {Object} Object containing products, loading state, and error
 */
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch products from API when component mounts
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://dummyjson.com/products')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        setError(err.message || 'Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

