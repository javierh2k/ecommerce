import React, { Fragment } from 'react'
import { withFetch } from '../shared/HOC/withFetch'
// import { useStateContext } from '../components/Provider.jsx'
import { Item } from '../components/Item.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { Helmet } from "react-helmet";
import { useGlobalStore } from '../store/globalStore';
import { shallow } from 'zustand/shallow'

function ItemsList(props) {
  const { items = [], categories = [] } = props.data 
  const [storeItems, storeCategories] = useGlobalStore(state => [state.items, state.categories], shallow);
  const list = items.length ? items : storeItems;
  const listCategories = categories.length ? categories : storeCategories;
  
  return (
    <section className="body">
      <Helmet>
        <title>List Items</title>
        <meta name="description" content="List of items ecommerce" />
      </Helmet>
      <div className="body__content">
        {list.length > 0 && <Fragment>
            <Breadcrumb categories={listCategories} />
            <ul className="card">
              {list.map((item,i) => (<Item key={`l${i}`} item={item} />))}
            </ul>
          </Fragment>
        }
      </div>
    </section>
  )
}

export default withFetch(ItemsList)