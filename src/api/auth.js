import axios from './axios';
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000  < Date.now();
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post('/auth/refresh', {
      refreshToken: sessionStorage.removeItem('session_token'),
    });
    sessionStorage.setItem('session_token', res.data.token);
    return res.data.token;
  } catch (err) {
    return null;
  }
};
