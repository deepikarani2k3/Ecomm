import { Link } from 'react-router-dom'
import './NotFound.css'


 // NotFound component
 
function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="error-details">
          <h2>Error Details:</h2>
          <ul>
            <li>Status Code: 404</li>
            <li>Error Type: Not Found</li>
            <li>Description: The requested resource could not be found on this server.</li>
          </ul>
        </div>
        <Link to="/" className="home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound

