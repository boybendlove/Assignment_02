import React, { useState } from "react";
import axios from "axios";
import './Login.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const data= {token: response.data.token,
      username: response.data.username}
      // Xử lý khi đăng nhập thành công, ví dụ: lưu token vào localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      onLogin();
      alert("Đăng nhập thành công!");
      // Điều hướng tới trang chính hoặc trang sau khi đăng nhập thành công
    //   setTimeout(() => {
    //     // Chuyển hướng trang
    //     window.location.href = "/";
    //   }, 2000);
    } catch (error) {
      setErrorMessage("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Tài khoản</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <a href="/register" style={{marginTop: "10px"}}> Register</a>
    </div>
  );
};

export default LoginForm;
