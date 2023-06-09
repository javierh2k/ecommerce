import React, { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

import { shallow } from 'zustand/shallow'
import Logo_ML from '../../../public/assets/Logo_ML.png'
import Logo_ML2x from '../../../public/assets/Logo_ML@2x.png'
import ic_Search from '../../../public/assets/ic_Search.png'
import ic_Search2x from '../../../public/assets/ic_Search@2x.png'

import { useGlobalStore } from '../store/globalStore'

export default function Header() {
  // console.log('HEADER:render')
  const navigate = useNavigate();
  const location = useLocation();
  const setData = useGlobalStore(state => state.actions.setData, shallow);

  const term = useRef('');
  let [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get('search')

  function navigateParams(queryTerm) {
    if (location.pathname !== "/items") {
      navigate('/items?q=' + queryTerm)
    } else {
      setSearchParams({ search: queryTerm });
      setData(queryTerm);
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      term.current = event.target.value;
      navigateParams(event.target.value);
    }
  };

  function handleClick() {
    navigateParams(term.current);
  }

  function handleBlur(event) {
    term.current = event.target.value;
  }

  return (
    <header className="header">
      <div className="header__content">
        
        <img className="header__content_image" onClick={()=>navigate('/items')}
          src={Logo_ML}
          srcSet={`${Logo_ML2x} 2x`}
        />
        <input
          onSubmit={e => e.preventDefault()}
          defaultValue={defaultValue}
          type="text"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Nunca dejes de buscar" />
        <button type="button" onClick={handleClick}>
          <img 
            src={ic_Search}
            srcSet={`${ic_Search2x} 2x`}
          />
        </button>
      </div>
    </header>
  )
}