import './header.css';
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to="/" className='logo'>Prime Flix</Link>
        <Link to="/favoritos" className='favoritos'>Meus Favoritos</Link>

    </header>
  )
}

export default Header
