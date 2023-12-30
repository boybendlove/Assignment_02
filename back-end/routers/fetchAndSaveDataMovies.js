const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');

const API_KEY = '4ad3e5b0043a9da812e81ff2b7a8167c'; // Thay YOUR_API_KEY bằng API key của bạn

const urlMovieid = `https://api.themoviedb.org/3/movie/changes?api_key=${API_KEY}`;
const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer 4ad3e5b0043a9da812e81ff2b7a8167c`, // Thay YOUR_BEARER_TOKEN bằng bearer token của bạn (nếu cần thiết)
  },
};
// Function to fetch movie_id list from the API
const fetchMovieIds = async () => {
  try {
    const response = await axios.get(urlMovieid);
    // console.log(response)
    const movieChanges = response.data.results;
    // console.log(movieChanges)
    // Extract 'movie_id' from each change entry
    const movieId = movieChanges.map((change) => change.id);
    // console.log(movieId)
    return movieId;
  } catch (error) {
    console.error('Error fetching movie IDs:', error.message);
    return [];
  }
};
const fetchMovieData = async (movieId) => {
  try {
    // console.log(movieId)
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    const response = await axios.get(API_URL);
    const movieData = response.data;
    // console.log(movieData)
    return movieData;
  } catch (error) {
    console.error(`Error fetching data for movie ID ${movieId}:`, error.message);
    return null;
  }
};
const fetchVideoData = async (movieId) => {
  try {
    // console.log(movieId)
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
    const response = await axios.get(API_URL);
    const videoData = response.data;
    // console.log(videoData)
    return videoData;
  } catch (error) {
    console.error(`Error fetching data for video ID ${movieId}:`, error.message);
    return null;
  }
};

// Hàm để lấy dữ liệu từ API và lưu vào các tệp JSON tương ứng
const fetchAndSaveData = async () => {
  try {
    const movieIds = await fetchMovieIds();
    const allMovies = [];
    const allVideos = [];
  for (const movieId of movieIds) {
    // console.log(movieId)
    const movieData = await fetchMovieData(movieId);
    const videoData = await fetchVideoData(movieId);
    if (movieData !== null) {
      allMovies.push(movieData);
    }
    if (videoData !== null) {
      allVideos.push(videoData);
    }
  }

  // Save allMovies to a JSON file
  fs.writeFileSync('./data/movieList.json', JSON.stringify(allMovies, null, 2));

  console.log('Data for all movies saved successfully.');
  
  // Fetch video data

  // console.log(`aaaa: ${allVideos}`)

  // Save video data to videoList.json
  fs.writeFileSync('./data/videoList.json', JSON.stringify(allVideos, null, 2));
  console.log('Data for all video movies saved successfully.');

    // Fetch genre data
    const responseGenre = await fetch(urlGenre);
    console.log(responseGenre)
    const genreData = await responseGenre.json();
    console.log(genreData)

    // Save genre data to genreList.json
    fs.writeFileSync('./data/genreList.json', JSON.stringify(genreData, null, 2));
    console.log('Data for all genreList saved successfully.');

    
    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

module.exports = fetchAndSaveData;
