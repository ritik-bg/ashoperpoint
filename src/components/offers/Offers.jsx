import React from 'react'
import exclusive from '../../assets/exclusive.png'

const Offers = () => {
   return (
      <div className="mt-5 bg-gradient-to-r from-gray-500 to-gray-50 md:h-[70vh] h-[20vh] flex justify-between md:px-16 px-8">
         <div className="left h-full">
            <h1 className='md:text-4xl text-base font-bold text-orange-950 md:mt-28 mt-8 leading-tight'>
               EXCLUSIVE <br /> OFFERS FOR YOU
            </h1>

            <h5 className='md:text-lg text-sm font-semibold font-sans '>ONLY ON BEST SELLERS PRODUCTS</h5>
            <button className='md:text-lg text-sm font-semibold bg-orange-900 md:w-40 px-3 rounded-xl mt-5 hover:scale-110 duration-500  ' >Check Now</button>
         </div>
         <div className="right h--full">
            <img src={exclusive} className='md:w-[270px] w-[105px] h-[150px]  md:h-[400px]' />
         </div>
      </div>

   )
}

export default Offers
