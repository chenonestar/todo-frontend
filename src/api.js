import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/todo', // 假设后端运行在 3001 端口
});

export default api;
