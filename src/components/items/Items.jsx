import React from 'react'
import './item.css'
import arrow from '../../assets/arrow.png';
import { Link } from 'react-router-dom';

const Items = (props) => {
  return (
    <div className="item mb-5">

      <Link to={`/product/${props.id}`} > <img className=' pehla ' src={props.image} alt='product image' /></Link>




      <p className='text-lg font-semibold text-center '>{props.name}</p>
      <div className="item-prices flex items-center justify-center">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}

        </div>
      </div>
    </div>
  )
}

export default Items
