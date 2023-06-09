import React from 'react';

export function Breadcrumb({ categories = [] }) {
  if (!categories.length) return null
  return (
    <ul className="breadcrumb" >
      {categories.map((category, i) => (
        <li key={i}>{category} </li>
      ))}
    </ul>
  )
}