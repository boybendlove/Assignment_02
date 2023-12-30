// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import MoviesData from '../../browse/MoviesDetail/moviesDetail';
import "./resulst.css"

const baseUrl = "https://image.tmdb.org/t/p/w500/";

// main API used to display trending page
const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=4ad3e5b0043a9da812e81ff2b7a8167c&page=`;


const Movie = ( {movies, onMovies}) => {
    const [trailerUrl, setTrailerUrl] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [id2,setId2] = useState("");


// lấy dữ liệu phim để tìm kiếm
useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data)=> {
        onMovies(data.results)
      })
  }, []);
 
  // show film
  const handleMovie = (movie,id)=>{
      
    if(`${id}`!==id2){
      setIsExpanded(true)
      setTrailerUrl(movie)
      localStorage.setItem(id,id)
      var x = localStorage.getItem(id)
      setId2(x)
    }else{
      setIsExpanded(false)
      localStorage.clear();
      setId2("")
  }
   
  }

    return (
    <div className="rows">
        <h2>Search Result</h2>
         <div className="moviePoster">
        {movies.length > 0 ? movies.map((movie) => (

       <div>
        <img
            key={movie.id}
            onClick={() => handleMovie(movie,movie.id)}
            className={`row__poster row__posterLarge`}
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.name}
            movie={movie}
            value={movie.adult}
          />
       </div>

  
        ))
        : <p class="noResults">No results found. Please try again?</p>}

        </div>
        {isExpanded &&
 
        ( <MoviesData
         movie={trailerUrl}
          />)
    
         }

        </div>


    )
}


export default Movie;
