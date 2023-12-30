import React ,{ useEffect, useState } from "react";
import "./navbar.css";
import Search from "../../search/Search.jsx";
const Navbar = () => {
  // tạo sự kiện người dùng cuộn xuống quá 100px thì bạn sẽ đổi màu nền cho Navbar từ trong suốt sang màu đen
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    console.log(show);
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  const username = localStorage.getItem("username") || []
  return (
    <div className={`nav ${show ? "nav__black " : ""}`}>
      <a href="/"> Movies App</a>
    <a href="/Search" element={<Search/>} style={{width: "30px", marginRight: "5%"}}> 
    <svg    
	className='svg-inline--fa fa-search fa-w-16 avatar'
	fill='#ccc'
	aria-hidden='true'
	data-prefix='fas'
	data-icon='search'
	role='img'
	xmlns='http://www.w3.org/2000/svg'
	viewBox='0 0 512 512'><path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path></svg></a>
	<a href="/" style={{ marginRight: "5%"}}>{username}</a>

    </div>
  );
};

export default Navbar;
