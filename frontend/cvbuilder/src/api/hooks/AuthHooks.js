import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../api/apiService';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const token = data.token; // or data.accessToken
      if (token) {
        localStorage.setItem('token', token);
        console.log('✅ Auth success, token stored');
      }
    }
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp
  });
};