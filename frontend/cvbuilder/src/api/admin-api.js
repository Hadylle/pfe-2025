import axiosInstance from './axiosInstance';

// Axios-based API functions
export const fetchUsers = async () => {
  const response = await axiosInstance.get('auth/users');
  return response.data;
};

export const fetchUserCVs = async (userSub) => {
  const response = await axiosInstance.get(`/cv/all-cvs/${userSub}`);
  return response.data;
};

export const fetchUsageStats = async () => {
  const response = await axiosInstance.get('/cv/usage-stats');
  return response.data;
};

export const fetchAllCVs = async () => {
  const response = await axiosInstance.get('/cv/all-cvs');
  return response.data;
};

