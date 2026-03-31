import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//STYLES
import './index.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
