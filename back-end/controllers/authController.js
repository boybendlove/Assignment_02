const Users = require("../models/Users.js")
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Đăng ký tài khoản
const registerUser = (req, res) => {
  const { username, password, email, phoneNumber } = req.body;
  const userTokens =Users.all();
  // Kiểm tra tên đăng nhập đã tồn tại hay chưa
  const userExists = userTokens.find((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists" });
  }
  const maxId = Math.max(...userTokens.map(user => user.id), 0);
  const newId = maxId + 1; // Tăng ID lên 1
    // Tạo trường token tự động
  const token = uuidv4();

  // Lưu thông tin tài khoản vào file userToken.json
  const newUser = { id: newId, username, password, email, phoneNumber, token };
  userTokens.push(newUser);
  fs.writeFile('./data/userToken.json', JSON.stringify(userTokens), (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Registration successful", token, userTokens });
  });
};

// Đăng nhập
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Tìm tài khoản trong danh sách userTokens
  const userTokens = Users.all();
  const user = userTokens.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({ message: "Login successful", token: user.token, username:user.username});
};

module.exports = {
  registerUser,
  loginUser,
};
