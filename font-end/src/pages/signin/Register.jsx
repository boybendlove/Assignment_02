import React, { useState } from 'react';
import './Login.css';

const RegisterForm = () => {
  
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi yêu cầu đăng ký đến máy chủ
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
          // Xử lý khi đăng ký thành công, ví dụ: chuyển hướng đến trang đăng nhập
          window.location.href = '/';
        console.log(data)
        } else {
          // Xử lý khi đăng ký thất bại, ví dụ: hiển thị thông báo lỗi
          console.error('Registration failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='login-page'>
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;