import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useSignIn = () =>
  useMutation({
    mutationFn: async (loginData) => {
      const response = await axiosInstance.post('/auth/signin', loginData);
      const token = response.data.token; // or response.data.accessToken
      if (token) {
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('✅ Auth success, token attached to axiosInstance');
      }
      return response.data;
    },
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: async (signupData) => {
      const response = await axiosInstance.post('/auth/signup', signupData);
      return response.data;
    },
  });
