import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../css/deltaproduct.module.css'; // Import CSS module

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [deltaProduct, setDeltaProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm theo id
    axios.get(`http://localhost:3000/api/v1/deltaproduct/${id}`)
      .then(response => {
        if (response.data.errCode === 1) {
          setDeltaProduct(response.data.deltaProduct); // Lấy thông tin chi tiết sản phẩm
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
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className={styles.deltaproductContainer}>
      {deltaProduct ? (
        <>
          <h2 className={styles.deltaproductTitle}>{deltaProduct.ten}</h2>
          <img
            className={styles.deltaproductImage}
            src={`http://localhost:3000/images/product/${deltaProduct.hinhanh}`}
            alt={deltaProduct.ten}
            width="200"
          />
          <p className={styles.deltaproductDescription}>{deltaProduct.mota}</p>
          <p className={styles.deltaproductPrice}>Giá: {deltaProduct.gia} VND</p>
        </>
      ) : (
        <p className={styles.deltaproductNotFound}>Không tìm thấy sản phẩm</p>
      )}
    </div>
  );
};

export default ProductDetail;
