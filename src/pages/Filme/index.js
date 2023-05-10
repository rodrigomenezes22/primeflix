import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';


function Filme() {

  const [ filme, setFilme ] = useState({});

  const [ loading , setLoading ] = useState(true);

  const { id } = useParams(); 

  const navigate = useNavigate();

  


  // Load Movie Details
  useEffect(()=>{
    async function loadFilme() {
        const response = await api.get(`/movie/${id}`, {
            params: {
                api_key: `${process.env.REACT_APP_MOVIE_KEY}`,
                language: "pt_BR",
                page: 1,
            }
        }).then((response) => {
          // console.log(response.data);
          setFilme(response.data);
          setLoading(false);
        }).catch(()=> {
          console.log("Filme nao encontrado");
          navigate('/', { replace: true })
        })


    }

    loadFilme();

  },[navigate, id]);

  const salvarFilme = ()=> {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmeSalvo)=>  filmeSalvo.id === filme.id  )

    if(hasFilme) {
      toast.warn("Esse filme já está salvo na sua lista!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme adicionado a sua lista de favoritos!")

  }

  if(loading) {
    return (
        <div className='loading'>
            Carregando detalhes do filme...
        </div>
    )
  }


  return (
    <div className='filme-info'>
      
      <h1>{filme.title}</h1>
      <h2>Categorias: 
        {filme.genres.map((categoria, index)=> {
            return <span key={index}> {categoria.name}{index !== filme.genres.length - 1 ? ', ' : ""}</span>
        })}

      </h2>

      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <p>{filme.overview}</p>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} target='blank'>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filme
