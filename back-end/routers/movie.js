const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware.js'); // Đặt đúng đường dẫn đến middleware


const router = express.Router();

// Route lấy danh sách các phim đang Trending
router.get('/api/movies/trending', movieController.getTrendingMovies, authMiddleware.AuthMiddleware);

// Route lấy danh sách các phim có Rating cao
router.get('/api/movies/top-rate', movieController.getTopRatedMovies,authMiddleware.AuthMiddleware);

// Route lấy trailer của một bộ phim
router.post('/api/movies/video', movieController.getMovieTrailer, authMiddleware.AuthMiddleware);

// Route tìm kiếm danh sách các phim theo từ khóa và các tham số tùy chọn
router.post('/api/movies/search',  movieController.searchMovies, authMiddleware.AuthMiddleware);

// Route tìm kiếm các phim phù hợp với các tham số được chỉ định (discover movies)
router.get('/api/movies/discover', movieController.discoverMovies, authMiddleware.AuthMiddleware);

module.exports = router;
