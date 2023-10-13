import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      //   const response = await axios.get(`${baseUrl}/services/ecommerce/Product`);
      //   setProducts(response.data);
      //   //   console.log(response.data);
      //   setIsLoading(false);
      console.log(baseUrl);
      await fetch(`${baseUrl}/api/products`)
        .then((response) => response.json())
        .then((res) => {
          // console.log(res);
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchProduct();
  };
  return { products, isLoading, error, refetch };
};

export default useFetch;
