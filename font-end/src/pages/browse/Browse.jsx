import React from 'react';
import NavBar from './Navbar/navBar.jsx';
import Banner from './banner/banner.jsx';
import Movielist from './MovieList/MovieList.jsx';
import "./browe.css"


function Browse() {
	return (
		<body className='App'>
			<NavBar/>
			<Banner/>
			<div><Movielist/></div>
		</body>
		
	);
}

export default Browse;

