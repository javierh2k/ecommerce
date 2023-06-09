import React, { Suspense, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HydrationProvider, useHydrated, Server, Client } from "react-hydration-provider";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

import ErrorBoundary from './shared/ErrorBoundary'
import Layout from './components/Layout.jsx'
import NotFound from './pages/NotFound.js'
import routes from './routes'
import { StoreContext, globalStore } from './store/globalStore.js';

import './styles/index.scss'

const queryClient = new QueryClient()

export default function App(props) {
  const { serverData = null } = props;
  return (
    <HydrationProvider>
      <StoreContext.Provider value={globalStore({...serverData, hydrated:true})} >
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </ErrorBoundary>
      </StoreContext.Provider>
    </HydrationProvider>
  )
}