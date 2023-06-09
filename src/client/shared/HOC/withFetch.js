import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const withFetch = (Component) => (props) => {
  console.log('withFetch:render')
  const location = useLocation();
  const currentPath = location.pathname;

  if (props.data) {
    return <Component {...props} data={props.data} />;
  }

  const url = `/api${currentPath}${location.search.replace('search', 'q')}`;
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["itemsData"],
    initialData: __isBrowser__ ? window.__INITIAL_DATA__ : props.data,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(r => r.json())
  });
  window.__INITIAL_DATA__ = undefined

  return <Component {...props} data={data} />;
};
