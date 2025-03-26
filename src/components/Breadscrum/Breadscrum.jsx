import React from 'react';
import { Link } from 'react-router-dom';
import arrow_icon from '../../assets/arrow.png';

const Breadscrum = ({ product }) => {
  // Add error handling for when product is undefined
  if (!product) {
    return <div className="breadscrum">Loading...</div>;
  }

  return (
    <div className="breadscrum flex gap-1 opacity-85 m-2 ">
     <Link to= "/" > HOME </Link><img src={arrow_icon} alt="arrow" className='h-3 w-3 mt-2 ' /> 
      SHOP <img src={arrow_icon} alt="arrow"  className='h-3 w-3 mt-2   ' /> 
      {product.category} <img src={arrow_icon} alt="arrow"  className='h-3 w-3 mt-2  ' />  {/* Note: lowercase 'category' */}
      {product.name}
    </div>
  );
};

export default Breadscrum;