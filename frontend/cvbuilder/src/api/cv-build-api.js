import axiosInstance from './axiosInstance';

export const saveCvBuild = async (cvData) => {
  try {
    console.log('📝 Data being sent to saveCvBuild API:', cvData);

    const response = await axiosInstance.post('/cv/build/save', cvData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ Save response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Detailed save error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });
    throw error;
  }
};


