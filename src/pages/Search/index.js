import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import './search.css'

function Search() {

    const { search } = useParams();

    const searchTerm = search;

    const [ filmes, setFilmes ] = useState([]);

    const [ loading , setLoading ] = useState(true);

    useEffect(()=>{
        async function loadFilmes() {
            const response = await api.get("search/movie?", {
                params: {
                    api_key: `${process.env.REACT_APP_MOVIE_KEY}`,
                    language: "pt_BR",
                    page: 1,
                    query: `${searchTerm}`
                }
            }).then((response)=>{
            // console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
            }).catch((error)=>{
                console.log("Erro ao carregar." + error)
            })


        }

        loadFilmes();

    },[search])


    if(loading) {
        return (
            <div className='loading'>
                Carregando filmes.
            </div>
        )
    }

    if(filmes.length === 0){
        return (
            <div className='loading'>
               Filme não encontrado.
            </div>
        )
    }

  return (
    <div>
      <div className='container'>
        <div className='lista-filmes'>
            {filmes.map((filme)=> {
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`}>Acessar Filme </Link>
                    </article>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Search
