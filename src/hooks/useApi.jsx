import { useState, useEffect } from "react";
import axios from "axios";

// Create the api object outside the hook
const api = axios.create({
  baseURL: "BASE_URL", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

const useApi = (method, url, data = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api({
          method: method.toLowerCase(),
          url: url,
          data: data,
        });
        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err);
        setResponse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { response, error, isLoading };
};

export default useApi;