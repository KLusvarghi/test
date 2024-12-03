import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";

// Função para definir um cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  // const cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;domain=seu-dominio.com`;
  const cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
  console.log("Setting cookie:", cookie);
  document.cookie = cookie;
};


// Função para ler um cookie
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  console.log(cookies)
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
};

// Hook que faz requisição a URL informada e retorna o data, erro e loading
const useFetchData = <T,>(url: string, type: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalMs = 1800000;

  const fetchData = useCallback(async () => {
    try {
      console.log('fez o fetch')
      setLoading(true);

      // Sempre faz a requisição para atualizar os dados
      const response = await axios.get(url);
      setData(response.data);
      setCookie(type, JSON.stringify(response.data), 7); // Atualiza o cookie com novos dados
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [type, url]);

  useEffect(() => {
    const executeFetch = async () => {
      const cookie = getCookie(type);
      console.log(cookie)
      if (cookie) {
        // Usa o cookie se existir e atualiza os dados
        const parsedData = JSON.parse(cookie) as T;
        setData(parsedData);
      }else{ 
        // Faz a primeira requisição independente do cookie
        await fetchData();
      }

      // Configura o setTimeout para atualizar os dados a cada 1 hora
      timeoutRef.current = setTimeout(executeFetch, intervalMs); // 1 hora = 3600000 ms
    };

    executeFetch();

    // Limpa o timeout quando o componente desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [url, type, fetchData]);

  return { data, error, loading };
};
export default useFetchData;
