import { useState } from "react";

const useFetchProducts = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const fetchProducts = async () => {
    try {
      setError(null);
      setIsPending(true);
      const res = await fetch('http://localhost:5000/show');
      const json = await res.json();
      if (!res.ok) {
        console.log(json);
        setIsPending(false);
        setError(json.error);
      }
      setIsPending(false);
      setError(null);
      return json;
    } catch (error) {
      console.log(error);
      setIsPending(false);
      setError(error.message);
    }
  };
  return { fetchProducts, error, isPending };
};

export default useFetchProducts;