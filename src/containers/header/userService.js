import axios from 'axios';

const login = async (username, password ) => {
  return await axios.post('http://localhost:3000/api/v1/login', { username, password  }, { withCredentials: true });
};

const logout = async () => {
  return await axios.post('http://localhost:3000/api/v1/account', {}, { withCredentials: true });
};

const account = async () => {
  return await axios.get('http://localhost:3000/api/v1/account', { withCredentials: true });
};

export { login, logout, account }; // Export named
