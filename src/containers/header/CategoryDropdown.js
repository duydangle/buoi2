import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Thêm dòng này để import axios
import { Link } from 'react-router-dom';
import styles from '../css/header.module.css';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API lấy danh sách category
    axios.get('http://localhost:3000/api/v1/category')
      .then(response => {
        if (response.data.errCode === 1) {
          setCategories(response.data.categorys);
        } else {
          setError('Có lỗi xảy ra khi lấy dữ liệu');
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Không thể kết nối với API');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Nếu đang tải hoặc có lỗi
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className={styles.categoryDropdown}>
      {categories.map((category, index) => (
        <Link
          key={index}
          to={`/productbycategory/${category.idnhom}`}
          className={styles.categoryListItem}
        >
          {category.ten}
        </Link>
      ))}
    </div>
  );
};

export default CategoryDropdown;
