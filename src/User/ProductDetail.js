import React, { useState, useEffect } from 'react';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost/D_B_D_P/api/Demo/GetProductWithImage');
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      {product.imageData && (
        <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(product.imageData)))}`} alt="Product" />
      )}
    </div>
  );
 
};

export default ProductDetail;
