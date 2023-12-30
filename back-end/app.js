const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routers/movie.js');
const authRoutes = require('./routers/auth.js');
const bodyParser = require('body-parser');
const Movies = require("./models/Movies.js")


const fetchAndSaveData = require('./routers/fetchAndSaveDataMovies.js');
fetchAndSaveData();
const port = 5000;
console.log(Movies)

// Middleware để xử lý dữ liệu từ body của request
app.use(bodyParser.json());
console.log(`bbbb:`)

// Sử dụng cors middleware để xử lý CORS
app.use(cors());
console.log(`cccc:`)

// LOGIN
app.use(authRoutes);
console.log(`ddddd:`)

// Sử dụng Routes
app.use(routes);
console.log(`eeeee:`)

// Xử lý khi người dùng truy cập sai Endpoint
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

