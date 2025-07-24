import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // make sure this path is correct

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (err) {
        console.error(`❌ useFetch error on ${url}:`, err); // helpful log
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
