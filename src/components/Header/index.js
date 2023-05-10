import './header.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {

  const navigate = useNavigate();

  const [ searchTerm, setSearchTerm ] = useState('');

  const handleSearch = (e) => {
      e.preventDefault()
      navigate(`/search-results/${searchTerm}`)
  }

  const handleSearchInput = (e) => {
      setSearchTerm(e.target.value);
  }

  return (
    <header>
        <div className='logo-button'>
        <Link to="/" className='logo'>Prime Flix</Link>

        <Link to="/favoritos" className='favoritos'>Meus Favoritos</Link>
        </div>
        <div className='searchbar'>
          <form onSubmit={handleSearch}>
            <input type='text' name='search' onChange={handleSearchInput} className='search-form' placeholder='search' />
            <button className='search-button'>Search Movie</button>
          </form>
        </div>
    </header>
  )
}

export default Header
