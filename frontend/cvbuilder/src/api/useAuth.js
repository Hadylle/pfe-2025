import { useMutation } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';
import { useAuth } from '../context/AuthContext';

export const useSignIn = () => {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: async (loginData) => {
      const response = await axiosInstance.post('/auth/signin', loginData);
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.token;
      const role = data.roles?.[0] || 'USER'; // Default to USER role
      login(token, role);
    }
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (signupData) => {
      const response = await axiosInstance.post('/auth/signup', signupData);
      return response.data;
    }
  });
};