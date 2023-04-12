import React,{useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'

export const withFetch = (Component) => (props) => {
  console.log('withFetch:props::', props)
  
  const { id } = useParams()
  const [items, setItems] = useState(() => __isBrowser__?window.__INITIAL_DATA__: props.data)
  const [loading, setLoading] = useState(!items)
  const currentPath = __isBrowser__ ?window.location.pathname: '/';
  const fetchNewRepos = useRef(!items);
  const keyPath = currentPath.replace('/','')
 
  // console.log('items::', items)
  // console.log('currentPath::', currentPath)
  // console.log('fetchNewRepos::', fetchNewRepos)

    useEffect(() => {
        
          if (fetchNewRepos.current === true) {
          
              setLoading(true)
              fetch(`/api${currentPath}`,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              }).then(r=>r.json())
              .then(setItems)
              .finally(()=>{
                setLoading(false)
              })
            
          } else {
            fetchNewRepos.current = true
          }

        if (__isBrowser__) delete window.__INITIAL_DATA__;
  }, [currentPath])

  if (loading) {
    return <div className='loading'></div>
  }
 
  return <Component {...props} data={items} />;
};
