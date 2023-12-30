import React, { useState,useEffect} from "react";
import axios from "../../../axios.js";
import "./Row.css";
import YouTube from "react-youtube";


function MoviesData({movie} ){
    // const [isExpanded, setIsExpanded] = useState(false);
    const [trailerId, setTrailerId] = useState("");
    
  // lấy thông tin bộ phim
 useEffect(()=>{
  const fetchTrailer  =  () => {
  console.log(movie.id,"iiiiiiiiiiiiiiiiDddd");
  axios.post(`video`,{ filmId: movie.id })
  .then(response=>{
        // lấy video type = "Teaser" hoặc "Trailer" (Ưu tiên "Trailer" hơn)
        console.log(response.data)
        const video = response.data;
        console.log(video);
        
      if(video.length !==0){
        setTrailerId(video); 
          
        }
      else{
        alert('NO Records Found')
      }})
      .catch((err)=>{
          if(err.response){
            alert('NO Records Found')
          }
    })}
    fetchTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    console.log(trailerId.id)
 
      const opts = {
        height: '400',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
return(
    
    <div  className="trailer">
        <div className="trailer_review">
            <h1>{movie.title || movie.name || movie.original_name}</h1>
            <h3>{movie.release_date||movie.first_air_date}</h3>
            <h3>{movie.vote_average}</h3>
            <p>{movie.overview}</p>
        </div>
        <div  className="trailler_videos" style={{backgroundImage: `url('https://image.tmdb.org/t/p/w342${movie.backdrop_path}')`}}>

        {trailerId && (
  
  <YouTube
    videoId={trailerId.key}
    opts={opts}
    className="youtube" // defaults -> null
  />
)} 
</div>
   
</div>
)

}
export default MoviesData;