import { useState } from "react";
function Login() {
     // Tạo state cho form inputs
  const [inputs, setInputs] = useState({});
  const [isCheck, setCheck] = useState(false);

  // Hàm xử lý khi có thay đổi trong input fields
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Hàm xử lý khi checkbox được click
  const handleChecked = () => {
    setCheck(!isCheck);
  };
    // Hàm xử lý khi nhấn nút "Đăng nhập"
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn không cho form gửi và làm mới trang
        console.log("Dữ liệu đăng nhập:", inputs); // Log dữ liệu inputs
        console.log("Is Admin?", isCheck); // Log trạng thái checkbox
      };
    return(
    <from class='fromlogin' onSubmit={handleSubmit}>
        <label>Enter you name:
            <input type="text" name="username"
            value={inputs.username || ""}onChange={handleChange}
            />
        </label><br></br>
            <label>Enter you password:
        <input type="text" name="pass"
            value={inputs.pass || ""}onChange={handleChange}
        />
            </label><br></br>
        <label>
            <input type="checkbox"
            checked={isCheck}onChange={handleChecked}
            /> Is Admin?
        </label> <br></br>
        <button>Đăng nhập</button>
    </from>
    )
}
export default Login