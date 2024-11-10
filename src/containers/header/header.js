import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown'; // Import component mới
import { Context } from './Context'; // Import context để lấy thông tin user
import styles from '../css/header.module.css';

const Header = () => {
  const { user, logoutContext } = useContext(Context);  // Lấy thông tin user từ context

  return (
    <header className={styles.headerContainer}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        MyShop
      </Link>

      {/* Menu chính */}
      <nav>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/">Trang chủ</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/about">Giới thiệu</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/contact">Liên hệ</Link>
          </li>

          {/* Category dropdown */}
          <li className={styles.menuItem}>
            <span>Danh mục</span>
            <CategoryDropdown /> {/* Sử dụng CategoryDropdown ở đây */}
          </li>

          <li className={styles.menuItem}>
            {/* Hiển thị thông tin đăng nhập hoặc đăng xuất */}
            {user?.auth ? (
              <div className={styles.userMenu}>
                <span className={styles.greeting}>
                  Xin chào,  
                  <Link to={`/userinfor/${user.username}`} className={styles.usernameLink}>
                    {user.username}
                  </Link>
                </span>
                <span 
                  className={styles.logoutButton}
                  onClick={() => {
                    logoutContext();  // Đăng xuất người dùng
                  }}
                >
                  Đăng xuất
                </span>
              </div>
            ) : (
              <Link to="/login" className={styles.loginLink}>Đăng nhập</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
