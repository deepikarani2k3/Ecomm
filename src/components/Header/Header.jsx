import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../../store/selectors'
import './Header.css'


 //* Header component
 
function Header() {
  // Get cart item count from Redux store
  const cartItemCount = useSelector(selectCartItemCount)

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShoppyGlobe</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartItemCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

