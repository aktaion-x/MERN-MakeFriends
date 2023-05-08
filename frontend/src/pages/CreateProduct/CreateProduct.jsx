import { useState } from 'react';
import useCreateProduct from '../../hooks/useCreateProduct';
import './CreateProduct.css';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { createProduct, error, isPending } = useCreateProduct();

  const handleThumbnail = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100KB');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('changed');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = await createProduct(name, thumbnail);
    console.log(product);
  };
  return (
    <div className="create-product">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Product Name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Product Image</span>
          <input type="file" accept="image/*" onChange={handleThumbnail} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {isPending && (
          <button disabled className="btn">
            Loading...
          </button>
        )}
        {!isPending && <button className="btn">Signup</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateProduct;
