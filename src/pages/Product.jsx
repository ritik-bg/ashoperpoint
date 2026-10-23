import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadscrum from '../components/Breadscrum/Breadscrum';
import Shopcontext from '../Context/Shopcontext';
import Productdisplay from '../components/Productdisplay/Productdisplay';
import ProductNotFound from './ProductNotFound';

const Product = () => {
  const { all_products } = useContext(Shopcontext);
  const { productId } = useParams();
  
  const product = all_products?.find((item) => item?._id == (productId));

  // console.log(product,all_products);
  

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className='w-100 mx-auto md:w-[85%]'>
      <Breadscrum product={product} />
      <Productdisplay product={product} />
    </div>
  );
};

export default Product;
