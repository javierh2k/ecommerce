import React from 'react'
import ic_shipping from '../../../public/assets/ic_shipping.png'
import ic_shipping2x from '../../../public/assets/ic_shipping@2x.png'
import { useNavigate } from 'react-router-dom'

export function Item({ item }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/items/${id}`)
  }

  return (
    <li className="card__content" key={item.id} onClick={() => handleClick(item.id)}>
      <img className="card__image" src={item.picture} title=""></img>
      <div className="card__description">
        <div className="card__description__price">
          {`${item.price.currency} ${item.price.amount}.${item.price.decimals}`}
          <img src={ic_shipping} 
            title={item.title}
            srcSet={`${ic_shipping2x} 2x`}
          />
        </div>
        <div className="card__description__title"> {item.title}</div>
        <div className="card__description__status"> Completo Unico </div>
      </div>
      <div className="card__provider"> {item.condition}</div>
    </li>
  )
}
