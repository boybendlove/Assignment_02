import React, {useState, useEffect} from "react";
import axios from "../../../axios.js";
import requests from "../movieAPI/movie";
import "./Banner.css";

function Banner(){
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // lấy dữ liệu từ api
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          // lấy ngẫu nhiên sữ liệu của 1 bộ phim
          Math.floor(Math.random() * request.data.results.length-1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="banner"   style={{ backgroundSize: "cover",
        backgroundImage: `url(" https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "50% 10%",
      }}>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{movie?.overview}</h1>
      </div>
    </div>
  );
};

export default Banner;
