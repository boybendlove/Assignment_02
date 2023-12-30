import React, { useState } from 'react';
import './Searchfrom.css';

const SearchFrom = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    // Gọi API tìm kiếm với các tham số cần thiết
    const searchParams = new URLSearchParams({
      keyword: search,
      genre: genre,
      mediaType: mediaType,
      language: language,
      year: year,
    });

    // Thực hiện yêu cầu POST
    fetch('http://localhost:5000/api/movies/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Đặt loại dữ liệu là JSON
        // Các headers khác nếu cần
      },
      body:JSON.stringify({
        keyword: search,
      genre: genre,
      mediaType: mediaType,
      language: language,
      year: year,
      }) , // Chuyển dữ liệu tìm kiếm thành chuỗi JSON
    })
      .then((res) => res.json())
      .then((data) => {
        // Xử lý dữ liệu trả về sau khi tìm kiếm thành công
        onSearch(data.results);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Error:', error);
      });
  };

  const searchReset = () => {
    setSearch('');
    setGenre('');
    setMediaType('');
    setLanguage('');
    setYear('');
  };

  return (
    <div className='from'>
      <form onSubmit={submitForm}>
        {/* Các trường nhập liệu cho tìm kiếm dựa trên các tham số */}
        <input
          className='input'
          type='search'
          placeholder='Search for a movie..'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className='input'
          placeholder='Genre'
          type='search'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <select style={{width: "20%"}}
          className='input'
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
          <option value="person">Person</option>
        </select>

        <input
          className='input'
          placeholder='language'
          type='search'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <input
          className='input'
          placeholder='year'
          type='search'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button className='reset' type='button' onClick={searchReset}>
          Reset
        </button>
        <button type='submit' className='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFrom;
