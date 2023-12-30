


    const API_KEY = "4ad3e5b0043a9da812e81ff2b7a8167c";
    const requests = {
        fetchTrending: `trending`,
        fetchNetflixOriginals: `trending`,
        fetchTopRated: `top-rate`,
        fetchActionMovies: `discover?genre=28&page=1`,
        fetchComedyMovies: `discover?genre=35&page=1`,
        fetchHorrorMovies: `discover?genre=27&page=1`,
        fetchRomanceMovies: `discover?genre=10749&page=1`,
        fetchDocumentaries: `discover?genre=99&page=1`,
        fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
    };
    // return requests;
export default requests;