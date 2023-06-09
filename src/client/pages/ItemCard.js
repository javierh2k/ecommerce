import { useState } from "react";
import { withFetch } from "../shared/HOC/withFetch";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import Helmet from "react-helmet";

function ItemCard(props) {
  const {item, categories=[]} = props.data;

  if (!item) return null
  return (
    <section className="body">
      <div className="body__content">
        <Helmet>
          <title>{item.title}</title>
          <meta name="description" content={item.description} />
        </Helmet>
        <Breadcrumb categories={categories} />

        <div className="card_detail">
          <div className="card_detail__info">

            <div className="card_detail__info__image"><img src={item?.picture} title={item.title} /></div>
            <div className="card_detail__description">
              <div className="card_detail__description__title">Descripción del producto</div>
              <div className="card_detail__description__text">{item.description}</div>
            </div>
          </div>
          <div className="card_detail__sidebar">
            <div className="card_detail__sidebar__quantity">Nuevo - {item.solid_quatity} vendidos </div>
            <div className="card_detail__sidebar__title">{item.title}</div>
            <div className="card_detail__sidebar__price">{`${item.price.currency} ${item.price.amount}`} <div className="card_detail__sidebar__price__decimal">{item.price.decimals>0 && item.price.decimals}</div></div>
            <button className="card_detail__sidebar__button_buy"> Comprar </button>
          </div>


        </div>
      </div>
    </section>
  )
}

export default withFetch(ItemCard)
