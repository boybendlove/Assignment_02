// BackEnd/controllers/movie.js

const Videos = require('../models/Videos');
const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const UserTokens = require('../models/Users');

// Hằng số PAGE_SIZE dùng cho cơ chế Paging
const { PAGE_SIZE } = require('../utils/paging.js');



// Route lấy danh sách các phim đang Trending
const getTrendingMovies = (req, res) => {
  const { page } = req.query;
  const currentPage = parseInt(page) || 1;

  // Lấy toàn bộ danh sách các phim từ Model Movies
  const allMovies = Movies.all();

  // Sắp xếp các phim theo trường popularity giảm dần
  const trendingMovies = allMovies.sort((a, b) => b.popularity - a.popularity);

  // Áp dụng cơ chế Paging để lấy danh sách các phim trong Page hiện tại
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const data = trendingMovies.slice(startIndex, endIndex);

  // Tính tổng số trang dữ liệu có thể lấy
  const totalPages = Math.ceil(trendingMovies.length / PAGE_SIZE);

  // Gửi response về client
  res.status(200).json({
    results: data,
    page: currentPage,
    total_pages: totalPages,
  });
};

// Route lấy danh sách các phim có Rating cao
const getTopRatedMovies = (req, res) => {
  const { page } = req.query;
  const currentPage = parseInt(page) || 1;

  // Lấy toàn bộ danh sách các phim từ Model Movies
  const allMovies = Movies.all();

  // Sắp xếp các phim theo trường vote_average giảm dần
  const topRatedMovies = allMovies.sort((a, b) => b.vote_average - a.vote_average);

  // Áp dụng cơ chế Paging để lấy danh sách các phim trong Page hiện tại
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const data = topRatedMovies.slice(startIndex, endIndex);

  // Tính tổng số trang dữ liệu có thể lấy
  const totalPages = Math.ceil(topRatedMovies.length / PAGE_SIZE);

  // Gửi response về client
  res.status(200).json({
    results: data,
    page: currentPage,
    total_pages: totalPages,
  });
};
const discoverMovies = (req, res) => {
const genreId = req.query.genre;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const genres = Genres.all()
    console.log(genres)
    // Kiểm tra nếu genre param không tồn tại hoặc không hợp lệ
    if (!genreId) {
      return res.status(400).json({ message: 'Not found gerne param' });
    }
    console.log(genres)
    const genre = genres.genres.find((gen) => gen.id === parseInt(genreId));
    if (!genre) {
      return res.status(400).json({ message: 'Not found that gerne id' });
    }

    const allMovies = Movies.all();
    const totalMovies = allMovies.length;
    const totalPages = Math.ceil(totalMovies / PAGE_SIZE);

    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;

    // Lọc danh sách các phim theo genre_id
    const moviesByGenre = allMovies
      .filter((movie) => movie.genres.some((g) => g.id === parseInt(genreId)))
      .slice(startIdx, endIdx);

    res.json({
      results: moviesByGenre,
      page: page,
      total_pages: totalPages,
      genre_name: genre.name,
    });
  }
// Route lấy trailer của một bộ phim
const getMovieTrailer = (req, res) => {
  const {filmId} = req.body;

  // Kiểm tra xem người dùng đã gửi film_id chưa
  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id param" });
  }
  const videos = Videos.all();
  // Tìm video phù hợp của bộ phim theo film_id
  const movieVideos = videos.find((video) => video.id === filmId);
    if (!movieVideos) {
      return res.status(400).json({ message: 'Not found that film_id' });
    }
  const filteredVideos = movieVideos.results.filter((video) =>
    video.official === true && video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
);
  // Nếu không tìm thấy video phù hợp, trả về mã lỗi 404
  if (filteredVideos.length === 0) {
    return res.status(404).json({ message: 'Not found video' });
}

  // Tìm video có thời gian published_at gần nhất
  const latestVideo = movieVideos.results.reduce((prev, current) => {
    return new Date(current.published_at) > new Date(prev.published_at)
      ? current
      : prev;
  });

  // Trả về thông tin của video đó
  res.status(200).json(latestVideo);
};

// Route tìm kiếm danh sách các phim theo từ khóa và các tham số tùy chọn
const searchMovies = (req, res) => {
  const { keyword, genre, mediaType, language, year, page } = req.body;

  // Khởi tạo danh sách phim đã lọc với tất cả phim
  const movies = Movies.all()
  let filteredMovies = movies;

  // Kiểm tra xem có từ khóa (keyword) không
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.title.match(keywordRegex) ||
        (movie.overview && movie.overview.match(keywordRegex))
    );
  }

  // Lọc theo thể loại (genre)
  if (genre) {
    const genreRegex = new RegExp(genre, "i");
    filteredMovies = filteredMovies.filter((movie) => movie.genres.map((ge) => ge.name.match(genreRegex)));
  }

  // Lọc theo loại phim (mediaType)
  if (mediaType && mediaType !== "all") {
    const genreToMediaTypeMap = {
      Documentary: "person",
      Drama: "tv",
      "TV Movie": "tv",
      Music: "tv",
    };
    filteredMovies = filteredMovies.filter((movie) => {
      // Lấy mediaType tương ứng với thể loại phim
      const mappedMediaType = genreToMediaTypeMap[movie.genres.map((ge) => ge.name)] || "movie";
      // So sánh mediaType với mediaType được yêu cầu
      return mappedMediaType === mediaType;
    });;
  }

  // Lọc theo ngôn ngữ (language)
  if (language) {
    filteredMovies = filteredMovies.filter((movie) => movie.original_language === language);
  }

  // Lọc theo năm sản xuất (year)
  if (year) {
    filteredMovies = filteredMovies.filter((movie) => {
      // Lấy năm từ chuỗi ngày phát hành (release_date)
      const movieYear = new Date(movie.release_date).getFullYear().toString();
      // So sánh năm trong yêu cầu với năm của phim
      return movieYear === year;
    });;
  }

  // Sử dụng cơ chế Paging để chia dữ liệu thành nhiều trang (mỗi trang chứa 20 phim)
  const pageSize = 20;
  const totalItems = filteredMovies.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  let currentPage = parseInt(page) || 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const results = filteredMovies.slice(startIndex, endIndex);

  // Trả về danh sách các phim thỏa mãn
  res.status(200).json({ results, page: currentPage, total_pages: totalPages });
};


module.exports = {
  getTrendingMovies,
  getTopRatedMovies,
  discoverMovies,
  getMovieTrailer,
  searchMovies,
};
