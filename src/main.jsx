// Import React's StrictMode for additional development warnings
import { StrictMode } from 'react'
// Import createRoot to render React components into the DOM
import { createRoot } from 'react-dom/client'
// Import global styles
import './index.css'
// Import the main App component
import App from './App.jsx'

/**
 * Initialize the React application
 * 1. Find the root DOM element (id='root' in index.html)
 * 2. Create a React root
 * 3. Render the App component wrapped in StrictMode for development checks
 */
createRoot(document.getElementById('root')).render(
  // StrictMode: Highlights potential problems in the application during development
  <StrictMode>
    {/* Main App component - the entire ChatGPT application */}
    <App />
  </StrictMode>
)
