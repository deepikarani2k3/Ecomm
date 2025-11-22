import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/selectors'
import { clearCart } from '../../store/slices/cartSlice'
import './Checkout.css'

/**
 * Checkout component
 * Displays a form to collect user details and cart summary
 * On order placement, clears cart and redirects to home
 */
function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  // Get cart items and total from Redux store
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Place order: clear cart and show success message
    dispatch(clearCart())
    setOrderPlaced(true)
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  // If cart is empty, redirect to home
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Show order placed message
  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <h2>Order Placed!</h2>
          <p>Thank you for your purchase. Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="checkout-form-container">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-quantity">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

