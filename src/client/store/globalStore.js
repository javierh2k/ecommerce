import React, { useContext, createContext } from 'react'
import { createStore, useStore } from "zustand";
export const StoreContext = createContext()
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { QueryClient } from '@tanstack/react-query'
import { globalStoreInitialState } from './globalStoreInitialState'
import { globalStoreActions } from './globalStoreActions'
const queryClient = new QueryClient()

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api
  )

export const globalStore = (initialState) => {
  return createStore(log((set, get) => ({
    ...globalStoreInitialState,
    ...initialState,
    actions: globalStoreActions(set, get)
  }))
  )
}

export const useGlobalStore = selector => {
  const store = useContext(StoreContext)
  if (!store) throw new Error('Store is missing the provider')

  return useStore(store, selector)
}

  // if (process.env.NODE_ENV === 'development') {
  //   mountStoreDevtool('globalStore', globalStore);
  // }