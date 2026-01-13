import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Related_Products from '../Related_Products/Related_Products';
import cartcontext from '../../Context/Cartcontext';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCartItem } from '../../Slices/CartSlice/CartThunk';


const Productdisplay = (incomingprops) => {

  const { Purchase, setPurchase } = useContext(cartcontext);
  const userdata = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(userdata,"userdata");
  
  const { product } = incomingprops;
  const dispatch = useDispatch();

  const Additem = (product) => {

    setPurchase((prevcart) => (
      {
        ...prevcart, [product.id]: prevcart[product.id]
          ? { ...prevcart[product.id], quantity: prevcart[product.id].quantity + 1 }
          : { ...product, quantity: 1 },
      }
    ))
  }


  


  const handleItem = async(item) => {
    if (userdata && Object.keys(userdata).length > 0) {
      Additem(product);
      await dispatch(addToCartItem(product));
    } else {
      toast.error("You Need To Login First")
    }
  }

  return (
    <div>
      <div className="display-main flex gap-2 p-2 max-h-max">
        <div className='w-[12vw] h-[95vh]  p-2  '>
          <img className='mx-auto p-2' height={60} width={100} src={product.image} alt="" />
          <img className='mx-auto p-2' height={60} width={100} src={product.image} alt="" />
          <img className='mx-auto p-2' height={60} width={100} src={product.image} alt="" />
          <img className='mx-auto p-2' height={60} width={100} src={product.image} alt="" /></div>
        <div className='w-[30vw] h-[95vh]  m-auto '>   <img height={10} width={393} src={product.image} alt="" /> </div>
        <div className='w-[50vw] h-[95vh]  p-3 '>

          <h3 className='text-3xl text-black font-bold' >{product.name}</h3>
          <ul className='mt-3'><li className='fas fa-star' ></li>
            <li className='fas fa-star' ></li>
            <li className='fas fa-star' ></li>
            <li className='fas fa-star' ></li>
            <li className='fas fa-star-half-alt' ></li>
          </ul>


          <div className="oldprice flex gap-4  ">
            <li className='list-none line-through text-red-800'>${product.old_price}</li>
            <li className='list-none '>${product.new_price}</li>
          </div>
          <p>{product.description}</p>
          <div className="size mt-12 ">
            <h5 className='text-lg font-semibold '>Select Size</h5>

            <ul className='flex gap-4 mt-2 color-[#FFD700] '>
              <li className='fas text-gray-500 hover:text-red-950 cursor-pointer'  >S</li>
              <li className='fas  text-gray-500 hover:text-red-950 cursor-pointer'  >L</li>
              <li className='fas  text-gray-500 hover:text-red-950 cursor-pointer'>XL</li>
              <li className='fas  text-gray-500 hover:text-red-950 cursor-pointer'>XXL</li>

            </ul>



          </div><br /><br /><br /><br /><button className='text-white bg-gray-900 mt-8 w-28 h-10 rounded-md hover:scale-105 duration-500' onClick={() => handleItem(product)}>Add To Cart</button>


          <h1 className=' text-xl font-semibold'><br /><br />Category : <span className='text-red-950'> {product.category}</span>  <br /> Tags : Modern , Fashion</h1>

        </div>
      </div>
      <Related_Products category={product.category} />

    </div>
  )
}

export default Productdisplay
