import React, { Suspense, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HydrationProvider, useHydrated, Server, Client } from "react-hydration-provider";

import Layout from './components/Layout.jsx'
import NotFound from './pages/NotFound.js'
import ErrorBoundary from './shared/ErrorBoundary'
import routes from './routes'
import './styles.scss'
import { StateProvider } from './components/Provider.jsx';

export default function App(props) {
  const { serverData = null } = props;
  return (
    <HydrationProvider>
      <StateProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map(({ path, component: Element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Element data={serverData} />}
                />
              ))}
              <Route path='*' element={<NotFound />} />
            </Route>

          </Routes>
        </ErrorBoundary>
      </StateProvider>
    </HydrationProvider>
  )
}