import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/page-home.css'
import './styles/page-telemetri.css'
import './styles/page-temphumid.css'
import './styles/page-phwater.css'
import './styles/page-history.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
