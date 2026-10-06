import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>{
    fetchMovies()
  },[])

  const fetchMovies = async () =>{
     setIsLoading(true)
     const endpoint = `${API_BASE_URL}discover/movie`
      try {
        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok) throw new Error('Error fetching movies')
        
        const data = await response.json()
        console.log(data)
        setMovieList(data.results)

      } catch (error) {
        console.log(`Error fetching movies : ${error.message}`)
        setErrorMessage('Error fetching movies, please try again later.')
      } finally {
        setIsLoading(false)
      }
  }

  return (
    <div className="wrapper">
      <header>
        <img src="./hero.png" />
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <section className="all-movies">

        <h2 className="mt-[40px]">All Movies</h2>

        { isLoading ? (
          // <p className="text-white">Loading...</p>
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

      </section>

      
    </div>
  );
};

export default App;
