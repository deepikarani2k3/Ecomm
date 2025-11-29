import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/Header/Header'
import './App.css'

// Lazy load all route components for code splitting
const ProductList = React.lazy(() => import('./components/ProductList/ProductList'))
const ProductDetail = React.lazy(() => import('./components/ProductDetail/ProductDetail'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const Checkout = React.lazy(() => import('./components/Checkout/Checkout'))
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'))

// Create browser router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <ProductList />
        </Suspense>
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <ProductDetail />
        </Suspense>
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Cart />
        </Suspense>
      </>
    ),
  },
  {
    path: '/checkout',
    element: (
      <>
        <Header />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Checkout />
        </Suspense>
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <NotFound />
        </Suspense>
      </>
    ),
  },
])

/**
 * Main App component
 * Sets up routing and provides Suspense boundaries for lazy loaded components
 */
function App() {
  return <RouterProvider router={router} />
}

export default App

