import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../css/userInfor.module.css'; // Import CSS module

const UserInfo = () => {
    const { username } = useParams(); // Lấy username từ URL
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Yêu cầu API với template literal để bao gồm username
        axios.get(`http://localhost:3000/api/v1/deltauserbyusername/${username}`, { withCredentials: true })
            .then((response) => {
                setUser(response.data.deltauser);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError('Không thể tải dữ liệu người dùng');
            });

    }, [username]); // Thêm username vào mảng phụ thuộc để tải lại dữ liệu khi username thay đổi

    // Nếu chưa có dữ liệu người dùng, hiển thị thông báo tải dữ liệu
    if (!user) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Thông tin người dùng</h2>
            <p className={styles.welcomeMessage}>Chào mừng, {user.username}</p> {/* Hiển thị username */}
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Tên đăng nhập:</td>
                        <td className={styles.td}>{user.username}</td> {/* Sử dụng user.userName */}
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Họ và tên:</td>
                        <td className={styles.td}>{user.fullname}</td> {/* Sử dụng user.fullname */}
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Địa chỉ:</td>
                        <td className={styles.td}>{user.address}</td> {/* Sử dụng user.address */}
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Giới tính:</td>
                        <td className={styles.td}>{user.sex}</td> {/* Sử dụng user.sex */}
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Email:</td>
                        <td className={styles.td}>{user.email}</td> {/* Sử dụng user.email */}
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Vai trò:</td>
                        <td className={styles.td}>{user.role}</td> {/* Sử dụng user.role */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserInfo;
