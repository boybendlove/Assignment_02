const PAGE_SIZE = 20;

// Hàm tính tổng số page dữ liệu dựa vào số lượng phần tử và số phần tử trên mỗi page
const getTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

// Hàm lấy dữ liệu theo trang từ một mảng dữ liệu
const getDataByPage = (data, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

module.exports = {
  PAGE_SIZE,
  getTotalPages,
  getDataByPage,
};