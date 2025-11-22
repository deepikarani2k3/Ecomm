import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/selectors'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

/**
 * Cart component
 * Displays all items in the cart with options to modify quantities or remove items
 */
function Cart() {
  // Get cart items and total from Redux store
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart

