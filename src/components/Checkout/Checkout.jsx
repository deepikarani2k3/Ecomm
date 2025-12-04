import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/selectors'
import { clearCart } from '../../store/slices/cartSlice'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(clearCart())
    setOrderPlaced(true)

    setTimeout(() => navigate('/'), 1500)
  }

  // Empty cart redirect view
  if (!orderPlaced && cartItems.length === 0) {
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

  // Order success view
  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <h2>Order Placed 🎉</h2>
          <p>Thanks for shopping! Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        
        {/* LEFT SIDE — FORM */}
        <div className="checkout-form-container">
          <h3>Shipping Information</h3>

          <form onSubmit={handleSubmit} className="checkout-form">

            {[
              { label: 'Full Name *', name: 'name', type: 'text' },
              { label: 'Email *', name: 'email', type: 'email' },
              { label: 'Phone *', name: 'phone', type: 'tel' },
              { label: 'Address *', name: 'address', type: 'text' },
            ].map((field) => (
              <div className="form-group" key={field.name}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
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

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-quantity">Qty: {item.quantity}</span>
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
