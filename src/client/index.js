import * as React from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');
import * as serviceWorker from './service-worker';

hydrateRoot(
  container,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  {suppressHydrationWarning: true}
);

if (module['hot']) {
  module['hot'].accept();
}
serviceWorker.register();
