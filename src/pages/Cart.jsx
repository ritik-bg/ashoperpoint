
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import cartcontext from '../Context/Cartcontext';

const cart = () => {

  const { Purchase } = useContext(cartcontext);
  const Navigate = useNavigate()

  console.log(Purchase, "Purchase");


  const userdata = JSON.parse(localStorage.getItem("user") || "{}");
  const total = Object.values(Purchase).reduce(
    (acc, item) => acc + (item.new_price * item.quantity),
    0
  );

  console.log(total, "tptal");


  return (
    <div className=" text-black w-[100vw] h-[100vh] p-5 relative">
      <h1 className="text-2xl font-bold text-center"> {userdata ? (userdata?.name)?.toLowerCase() : ""} Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(Purchase).length > 0 ? (
          Object.values(Purchase).map((item) => (
            <div key={item.id} className="bg-gray-300 p-4 rounded shadow">
              <img src={item.image} alt={item.title} className="w-20 h-20 mx-auto" />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>Price: ${item.new_price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">  Your cart is empty.</p>
        )}
      </div>
      {total > 0 ? <span className='bg-orange-500 p-2 rounded-md fixed bottom-4 right-5 text-white '>
        <button onClick={() => { Navigate("/cart/check-out") }} >Procced To Pay</button> {"Rs." + total}  -&gt; </span> : null}
    </div>
  )
}

export default cart
