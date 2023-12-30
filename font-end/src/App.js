import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import { useEffect,useState} from "react";


import Browse from './pages/browse/Browse.jsx';
import Search from './pages/search/Search.jsx';
import Login from './pages/signin/login.jsx';
import RegisterForm from './pages/signin/Register.jsx';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		// Kiểm tra localStorage để xác định trạng thái đăng nhập
		const token = localStorage.getItem("token");
		if (token) {
		  setIsLoggedIn(true);
		} else {
		  setIsLoggedIn(false);
		}
	  }, []);
	console.log()
	return (
		<BrowserRouter>
					  <Routes>
		  {isLoggedIn === true ? (
          // Nếu đã đăng nhập, hiển thị trang duyệt
          <Route path="/" element={<Browse />} />
        ) : (
          // Nếu chưa đăng nhập, hiển thị trang đăng nhập
          <Route
            path="/"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
        )}
		<Route path="/search" element={<Search />} />
		<Route path="/register" element={<RegisterForm />} />
		  </Routes>
		</BrowserRouter>
	  );
}

export default App;
