import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice'
import './CartItem.css'

/**
 * CartItem component
 * Represents a single item in the cart with options to modify quantity or remove
 * @param {Object} item - Cart item object containing product details and quantity
 */
function CartItem({ item }) {
  const dispatch = useDispatch()

  // Handle quantity change (ensures minimum quantity of 1)
  const handleQuantityChange = (newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1)
    dispatch(updateQuantity({ id: item.id, quantity }))
  }

  // Handle remove item from cart
  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
        <input
          type="number"
          id={`quantity-${item.id}`}
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="quantity-input"
        />
      </div>
      <div className="cart-item-total">
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
      <button
        className="remove-btn"
        onClick={handleRemove}
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </div>
  )
}

// PropTypes for type checking
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}

export default CartItem

