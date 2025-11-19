import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'
import './ProductDetail.css'

/**
 * ProductDetail component
 * Fetches and displays detailed information about a selected product
 * Uses route parameters to get product ID
 */
function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch product details')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  // Handle add to cart action
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-message">Loading product details...</div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h2>Error loading product</h2>
          <p>{error || 'Product not found'}</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              loading="lazy"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">Category: {product.category}</p>
          <div className="product-rating">
            <span>⭐ {product.rating || 'N/A'}</span>
            <span>Stock: {product.stock}</span>
          </div>
          <div className="product-price">${product.price}</div>
          {product.discountPercentage && (
            <div className="product-discount">
              {product.discountPercentage}% OFF
            </div>
          )}
          <p className="product-description">{product.description}</p>
          <div className="product-brand">
            <strong>Brand:</strong> {product.brand || 'N/A'}
          </div>
          <button
            className="add-to-cart-btn-large"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

