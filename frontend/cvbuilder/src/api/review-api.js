import axiosInstance from './axiosInstance';

export async function submitRating(rating, pageUrl) {
  try {
    const response = await axiosInstance.post('/cv/submit-rating', null, {
      params: {
        rating: rating,
        pageUrl: pageUrl
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
}

export async function getPageRatings() {
  try {
    const response = await axiosInstance.get('/cv/page-ratings');
    return response.data;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
}