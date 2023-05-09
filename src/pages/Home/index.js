import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

// https://api.themoviedb.org/3/movie/550?api_key=942d5f0a6a866510e9e8d81a6c94a328=pt-BR

function Home() {

    const [ filmes, setFilmes ] = useState([]);

    const [ loading , setLoading ] = useState(true);

    useEffect(()=>{
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: `${process.env.REACT_APP_MOVIE_KEY}`,
                    language: "pt_BR",
                    page: 1,
                }
            }).then((response)=>{
            // console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
            }).catch(()=>{
                console.log("Erro ao carregar.")
            })


        }

        loadFilmes();

    },[])


    if(loading) {
        return (
            <div className='loading'>
                Carregando filmes.
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

export default Home
