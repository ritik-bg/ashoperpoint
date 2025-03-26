import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadscrum from '../components/Breadscrum/Breadscrum';
import Shopcontext from '../Context/Shopcontext';
import Productdisplay from '../components/Productdisplay/Productdisplay';


const Product = () => {








  const { all_products } = useContext(Shopcontext);
  const { productId } = useParams();  // Get productId from URL params
  

  
  const product = all_products?.find((e) => e.id === Number(productId));
  
  console.log('Found Product:', product);  // Debug log

  // Add error handling
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadscrum product={product} />
      <Productdisplay product={product} />
    </div>
  );
};

export default Product;