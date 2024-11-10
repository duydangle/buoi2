import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Đảm bảo đường dẫn đúng tới App
import ProductList from '../containers/product/product';
import ProductDetail from '../containers/product/deltaproduct';
import Productbycategory from '../containers/product/productbycategory';
import Login from '../containers/header/login';
import UserInfo from '../containers/user/userInfor';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />
      },
      {
        path: "deltaproduct/:id",
        element: <ProductDetail />
      },
      {
        path: "productbycategory/:id",
        element: <Productbycategory />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "userinfor/:username",
        element: <UserInfo />
      }


      // {
      //     path: "sanpham/:iddm",
      //     element: <DSSanPhamNoiBat />
      //   },
      //   {
      //     path: "sanpham/chitiet/:idsp",
      //     element: <SanPham sanPham={null} />
      //   }
    ]
  }
]);
