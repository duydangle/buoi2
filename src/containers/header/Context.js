import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Cập nhật thông tin user vào context sau khi login
  const loginContext = (username) => {
    setUser({
      username,  // Lưu username vào context
      auth: true, // Đánh dấu đã đăng nhập
    });
  };

  // Xử lý đăng xuất
  const logoutContext = () => {
    setUser({
      username: '',
      auth: false, // Đánh dấu đã đăng xuất
    });
  };

  return (
    <Context.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
