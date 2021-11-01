import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom'

import '@/di/imports/main-thread'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App'

// @ts-ignore
console.log(TEST)

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
