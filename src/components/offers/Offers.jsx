import React from 'react'
import exclusive from '../../assets/exclusive.png'

const Offers = () => {
  return (
    <div className="mt-5 bg-gradient-to-r from-gray-500 to-gray-50 h-[70vh] flex justify-between px-16">
     <div className="left h-full">
        <h1 className='text-4xl font-bold text-orange-950 mt-28 leading-tight'>
  EXCLUSIVE <br/> OFFERS FOR YOU
</h1>

        <h5 className='text-lg font-semibold font-sans '>ONLY ON BEST SELLERS PRODUCTS</h5>
        <button className='text-lg font-semibold bg-orange-900 w-40 rounded-xl mt-5 hover:scale-110 duration-500  ' >Check Now</button>
     </div>
     <div className="right h--full">
        <img  src={exclusive} width={270} height={400} />
     </div>
  </div>
  
  )
}

export default Offers
