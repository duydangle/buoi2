import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from '../css/productbycategory.module.css'; // Import CSS module

const Productbycategory = () => {
  const { id } = useParams(); // Lấy id nhóm từ URL
  const [productbycategory, setProductByCategory] = useState([]);
  const [tenNhom, setTenNhom] = useState(''); // Tên nhóm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy sản phẩm và tên nhóm theo id
    axios.get(`http://localhost:3000/api/v1/getproductbycategory/${id}`)
      .then(response => {
        if (response.data.errCode === 1) {
          setProductByCategory(response.data.productbycategory); // Cập nhật sản phẩm vào state
          if (response.data.productbycategory.length > 0) {
            setTenNhom(response.data.productbycategory[0].ten_nhom); // Cập nhật tên nhóm
          }
        } else {
          setError(response.data.message); // Nếu có lỗi từ API
        }
      })
      .catch(() => {
        setError("Có lỗi xảy ra khi tải sản phẩm"); // Lỗi kết nối hoặc phản hồi từ API
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={styles.loadingMessage}>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.productByCategoryContainer}>
      <h2 className={styles.productTitle}>Danh sách sản phẩm theo nhóm: {tenNhom}</h2> {/* Hiển thị tên nhóm */}
      {productbycategory.length === 0 ? (
        <div className={styles.errorMessage}>Không có sản phẩm trong nhóm này.</div>
      ) : (
        <ul className={styles.productList}>
          {productbycategory.map((product, index) => (
            <li key={index} className={styles.productItem}>
              <h3>{product.ten}</h3> {/* Hiển thị tên sản phẩm */}
              <p>Giá: {product.gia} VND</p>
              <Link to={`/deltaproduct/${product.masp}`}>Chi tiết sản phẩm</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Productbycategory;
