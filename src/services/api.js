import axios from "axios"

// Base da URL https://api.themoviedb.org/3/
// URL da api https://api.themoviedb.org/3/movie/550?api_key=942d5f0a6a866510e9e8d81a6c94a328=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;