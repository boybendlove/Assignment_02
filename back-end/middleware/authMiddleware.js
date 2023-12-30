const Users = require('../models/Users');


const AuthMiddleware = (req, res, next) => {
  // Đọc dữ liệu từ tệp userToken.json
    let userTokenData = [];
  try {
    
    userTokenData = Users.all();
  } catch (error) {
    // Xử lý lỗi hoặc gán giá trị mặc định khi dữ liệu không hợp lệ
    userTokenData = [];
  }

  // Kiểm tra xác thực và các xử lý khác...
  const token = req.query.token; // Giả sử token được truyền vào dưới dạng query param

  // Kiểm tra xem người dùng có truyền vào token hay không
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Kiểm tra xem token có tồn tại trong danh sách userTokenData hay không
  const authenticatedUser = userTokenData.find((user) => user.token === token);

  if (!authenticatedUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Nếu người dùng đã được xác thực thành công, tiếp tục xử lý dữ liệu
  next();
};

module.exports = {AuthMiddleware};
