import { useEffect, useState } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const { fetchProducts, isPending, error } = useFetchProducts();
  useEffect(() => {
    const asd = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    asd();
  }, []);
  console.log(products);
  return (
    <div className="show-products">
      {products.length > 0 &&
        products.map((product) => (
          <div className="product" key={product._id}>
            <p>{product.name}</p>
            <img src={product.image.url} alt="" />
          </div>
        ))}
      {isPending && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default ShowProducts;
