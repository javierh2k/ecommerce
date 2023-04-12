import React, { useEffect, useRef } from 'react'
import Logo_ML from '../../../public/assets/Logo_ML.png'
import ic_Search from '../../../public/assets/ic_Search.png'
import { useSearchParams } from 'react-router-dom'
import { fetchTermAPI } from '../shared/fetchTermAPI'
import { useStateContext } from './Provider.jsx'

export default function Header() {
  const { setItems } = useStateContext();
  const term = useRef('');
  let [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get('search')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      term.current = event.target.value;
      setSearchParams({ search: event.target.value });
      fetchTermAPI(event.target.value).then(setItems);
    }
  };

  function handleClick() {
    setSearchParams({ search: term.current });
    fetchTermAPI(term.current).then(setItems);
  }

  function handleBlur(event) {
    term.current = event.target.value;
  }

  useEffect(() => {
    if (defaultValue) {
      fetchTermAPI(defaultValue).then(setItems);
    }
  }, [])

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__content_image" src={Logo_ML}></img>
        <input defaultValue={defaultValue} type="text" onBlur={handleBlur} onKeyDown={handleKeyDown} placeholder="Nunca dejes de buscar" />
        <button type="button" onClick={handleClick}><img src={ic_Search}></img></button>
      </div>
    </header>
  )
}