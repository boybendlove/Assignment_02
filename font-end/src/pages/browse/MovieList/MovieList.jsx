import React, { useState, useEffect } from "react";
import axios from "../../../axios.js";
import "./movielists.css";
import requests from "../movieAPI/movie";

import MoviesData from "../MoviesDetail/moviesDetail";




const baseUrl = "https://image.tmdb.org/t/p/original";

function Row  ({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [id2,setId2] = useState("");
  const token = localStorage.getItem("token"); // Thay YOUR_TOKEN_HERE bằng token thực tế của bạn
  console.log(token)
  const config = {
    headers: {
      Authorization:  token,
    },
  };

  // lấy dữ liệu API
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl,config);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

 
  // tạo sự kiện click vào ảnh show ra thông tin bộ phim
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
  console.log(isExpanded);

  console.log(id2,222)

 
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (

          <img
            key={movie.id}
            onClick={() => handleMovie(movie,movie.id)}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.name}
            movie={movie}
            value={movie.adult}
          />
        ))}
        
      </div>
     
      {isExpanded &&
 
   ( <MoviesData
   key={trailerUrl.id}
     movie={trailerUrl}
      />)
      
      }
   
    </div>
  );
};

// show list danh sách

function Movielists (){
    
return (
  <div>
 <Row
        title={"Original"}
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title={"Xu hướng"} fetchUrl={requests.fetchTrending} />
      <Row title={"Xếp hạng cao"} fetchUrl={requests.fetchTopRated} />
      <Row title={"Hành động"} fetchUrl={requests.fetchActionMovies} />
      <Row title={"Xếp hạng cao"}  fetchUrl={requests.fetchComedyMovies} />
      <Row title={"Kinh dị"} fetchUrl={requests.fetchHorrorMovies}/>
      <Row title={"Lãng mạn"} fetchUrl={requests.fetchRomanceMovies}/>
      <Row title={"Tài liệu"} fetchUrl={requests.fetchDocumentaries}/>
  </div>
);
}
export default Movielists;