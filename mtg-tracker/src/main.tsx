import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { seedMockData, clearMockData } from './utils/seedData.ts'

// @ts-ignore
window.seedMockData = seedMockData
// @ts-ignore
window.clearMockData = clearMockData
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
