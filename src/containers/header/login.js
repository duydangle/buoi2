import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, account } from './userService'; // Import hàm login từ userService
import { Context } from './Context'; // Import context
import styles from '../css/login.module.css'; // Import CSS Module

const Login = () => {
  const [stateInput, setStateInput] = useState({});
  const { user, loginContext, logoutContext } = useContext(Context);  // Lấy user từ context và loginContext
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const items = await login(stateInput.user, stateInput.pass); // Gọi hàm login từ userService
      if (items.data.err === 0) {
        setErrorMessage(items.data.message);  // Hiển thị thông báo lỗi nếu có
      } else {
        // Sau khi đăng nhập thành công, gọi API account để lấy thông tin người dùng
        const userResponse = await account(); // Gọi API getuser để lấy thông tin người dùng
        console.log(userResponse.data.message)
        loginContext(userResponse.data.data.user);  // Lưu username vào context
        alert("Đăng nhập thành công!");  // Hiển thị popup thông báo thành công
        setTimeout(() => {
          navigate("/");  // Chuyển hướng về trang chủ sau 1 giây
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Đăng nhập không thành công. Vui lòng thử lại!');  // Lỗi hiển thị thông thường
    }
  };
  
  return (
    <div>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setStateInput({ ...stateInput, user: e.target.value })}
          className={styles.inputField}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setStateInput({ ...stateInput, pass: e.target.value })}
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {/* Hiển thị tên người dùng và nút đăng xuất nếu đã đăng nhập */}
      {user?.auth ? (
        <div>
          <p className={styles.welcomeMessage}>Welcome, {user.username}</p>
          <button 
            className={styles.logoutButton} 
            onClick={() => {
              logoutContext();  // Đăng xuất người dùng
              navigate("/login");  // Chuyển hướng về trang đăng nhập
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
