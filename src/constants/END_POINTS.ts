import axios from "axios";

const BASE_URL = "https://upskilling-egypt.com:3007/api";

const BASE_AUTH = `${BASE_URL}/auth`;

export const AUTH_URL = {
  login: `${BASE_AUTH}/login `,
  register: `${BASE_AUTH}/register `,
  forgetPass: `${BASE_AUTH}/forgot-password`,
  resetPass: `${BASE_AUTH}/reset-password `,
  changePass: `${BASE_AUTH}/change-password `,
  logout: `${BASE_AUTH}/logout`,
};
// ------------------------------

export const GetAllBooks = `${BASE_URL}/book`;

export const GetAllcategory = `${BASE_URL}/category`;

export const Basket = `${BASE_URL}/basket`;

export const GetMyOrders = `${BASE_URL}/order/my`;

export const CreateOrder = `${BASE_URL}/order`;
//    /api/order / 664cc2495a4db11bb9c4faf6


// إعداد Axios instance
const api = axios.create({
  baseURL: 'https://upskilling-egypt.com:3007/api', // قاعدة URL الأساسية
});

// إضافة Interceptor لتعديل الـ headers في كل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // جلب التوكن من localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إلى الـ Authorization header
  }
  config.headers['Content-Type'] = 'application/json'; // ضبط نوع المحتوى
  config.headers.language = 'en'; // اللغة المطلوبة
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api; // Exporting the Axios instance for use in API requests
