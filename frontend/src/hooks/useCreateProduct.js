import { useState } from "react";

const useCreateProduct = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const createProduct = async (productName, productImg) => {
    const formData = new FormData();
    formData.append('productImg', productImg);
    formData.append('productName', productName);
    try {
      setError(null);
      setIsPending(true);
      const res = await fetch('http://localhost:5000/create', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError('Couldn\' send data');
        setIsPending(false);
      }
      setError(null);
      setIsPending(false);
      return json;
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { error, isPending, createProduct };
};
export default useCreateProduct;