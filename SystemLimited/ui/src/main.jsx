import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import System from './system.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <System />
  </StrictMode>,
)
