import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addToCart } from '../../store/slices/cartSlice'
import './ProductItem.css'

// productitem component
function ProductItem({ product }) {
  const dispatch = useDispatch()

  // Handle add to cart action
  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price-rating">
            <span className="product-price">${product.price}</span>
            <span className="product-rating">
              ⭐ {product.rating || 'N/A'}
            </span>
          </div>
        </div>
      </Link>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </div>
  )
}

// PropTypes for type checking
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
}

export default ProductItem

