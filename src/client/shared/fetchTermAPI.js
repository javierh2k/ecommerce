import React from 'react'

export async function fetchTermAPI(term){
  const currentPath = window.location.pathname;
    const resp= await fetch(`/api${currentPath}?q=${term}`,{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }});

    return await resp.json();
};
