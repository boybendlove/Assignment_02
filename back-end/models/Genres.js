const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/genreList.json');

const Genres = {
  all: function() {
    console.log(JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')));
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports = Genres;
