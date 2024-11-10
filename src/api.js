import axios from 'axios';

// 配置待办事项的 API 客户端
const todoApi = axios.create({
  baseURL: 'http://localhost:3001/todo', // 假设后端的待办事项模块运行在 /todo 路径下
});

// 配置注册和登录的 API 客户端
const authApi = axios.create({
  baseURL: 'http://localhost:3001/auth', // 假设后端的注册和登录模块运行在 /auth 路径下
});

export { todoApi, authApi };