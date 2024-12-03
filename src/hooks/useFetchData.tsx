import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetchData = <T,>(url: string, type: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const intervalMs = 1800000; // 30 minutos

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);

      // Salva os dados e o timestamp no localStorage
      localStorage.setItem(type, JSON.stringify(response.data));
      localStorage.setItem(`${type}_timestamp`, Date.now().toString());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [type, url]);

  useEffect(() => {
    const executeFetch = async () => {
      const storedData = localStorage.getItem(type);
      const storedTimestamp = localStorage.getItem(`${type}_timestamp`);

      if (storedData && storedTimestamp) {
        const parsedData = JSON.parse(storedData) as T;
        const lastFetched = parseInt(storedTimestamp, 10);

        // Verifica se já passou o intervalo desde a última atualização
        if (Date.now() - lastFetched < intervalMs) {
          setData(parsedData);
          setLoading(false);
          return; // Não faz nova requisição se o intervalo não foi atingido
        }
      }

      // Faz a requisição se não há dados ou se o intervalo expirou
      await fetchData();
    };

    executeFetch();

    // Opcional: Atualiza periodicamente enquanto o componente estiver montado
    const interval = setInterval(() => {
      executeFetch();
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData, intervalMs, type]);

  return { data, error, loading };
};

export default useFetchData;
