import React from 'react';
import ItemCard from './pages/ItemCard'
import Items from './pages/Items'

const routes =  [
  {
    path: '/items/:id',
    component: ItemCard,
    controllerInitialData: 'items/getItem',
  },
  {
    path: '/items',
    controllerInitialData: 'items/getItems',
    component: Items,
  }
]

export default routes