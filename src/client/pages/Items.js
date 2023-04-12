import React, { useState, useEffect, useRef } from 'react'
import { withFetch } from '../shared/HOC/withFetch'
import { useStateContext } from '../components/Provider.jsx'
import { Item } from '../components/Item.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import Helmet from "react-helmet";


function Items(props) {
  const {items: itemsProps=[]} = props.data;
  const {items: itemsContext=[]} = useStateContext();
  const list = itemsContext || itemsProps;
  const categories = list.categories || [];
 
   if(!list.items?.length){
    return <div></div>
   }


  return (
    <section className="body">
      <Helmet>
            <title>List items</title>
            <meta name="description" content="List products" />
      </Helmet>
      <div className="body__content">
        <Breadcrumb categories={categories}/>
        <ul className="card">
          {list.items.map(item=>(<Item item={item}/>))}
        </ul>
      </div>
    </section>
  )
}

export default withFetch(Items)