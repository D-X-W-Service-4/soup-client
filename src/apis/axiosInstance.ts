import axios from 'axios';
import { useAuthStore } from '../stores/UseAuthorStore.ts';

// 환경 변수 확인
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('환경 변수 로딩 확인:', {
  VITE_API_BASE_URL: API_BASE_URL,
  isEmpty: !API_BASE_URL,
});

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL이 설정되지 않았습니다.');
  console.error('.env 파일을 확인하고 개발 서버를 재시작해주세요.');
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('API 요청:', {
      url: config.url,
      baseURL: config.baseURL,
      method: config.method,
      hasToken: !!token,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network Error 처리 - baseURL이 없거나 서버 연결 실패
    if (error.message === 'Network Error') {
      console.error('네트워크 오류 - API 서버에 연결할 수 없습니다.');
      console.error('baseURL:', axiosInstance.defaults.baseURL);
      console.error('요청 URL:', error.config?.url);
    } else {
      console.error('API 요청 오류:', error);
    }

    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401) {
      const { clearToken } = useAuthStore.getState();
      clearToken();

      // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉트
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
