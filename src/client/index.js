import * as React from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');

hydrateRoot(
  container,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  {suppressHydrationWarning: true}
);
