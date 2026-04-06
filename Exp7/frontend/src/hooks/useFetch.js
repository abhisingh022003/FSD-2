import { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient } from '../services/apiClient';

function toErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export function useFetch(url, options = {}) {
  const { immediate = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState('');
  const mountedRef = useRef(true);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  const fetchData = useCallback(async () => {
    if (!url) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiClient.get(url);
      if (mountedRef.current) {
        setData(response.data);
      }
    } catch (requestError) {
      if (mountedRef.current) {
        setError(toErrorMessage(requestError, 'Unable to fetch data'));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
