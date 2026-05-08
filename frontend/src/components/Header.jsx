import React from 'react'

export default function Header({ totalItems = 0 }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Cloud Immunization</h1>
        <div className="header-info">
          <span className="total-items">{totalItems}</span>
        </div>
      </div>
    </header>
  )
}
