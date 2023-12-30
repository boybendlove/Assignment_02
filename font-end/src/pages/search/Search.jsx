import React, {useState} from 'react';
import SearchFrom from './Searchfrom/SearchFrom';
import Movies from './ResultList/ResultList';
import Navbar from '../browse/Navbar/navBar';

const Search = () => {
        // lay thong tin movies can tim kiem de show ra movies
	const [movies, setMovies] = useState([]);
return (
<body>
<div >
	<div><Navbar/></div>
        <SearchFrom onSearch={setMovies} />
        <Movies movies={movies} onMovies={setMovies}/>
	</div>
</body>
   );

	

};

export default Search;
