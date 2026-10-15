import React from 'react'
import women from '../../assets/women.png';
import arrow from '../../assets/arrow.png'


const Hero = () => {
  return (
    <div className='hero flex justify-between pl-6 pr-0 bg-yellow-300 md:h-[70vh] h-[15vh] w-full items-center text-xl font-semibold'>
      <div className="left md:p-14 p-1 h-full">
        <h1 className='text-lg'>NEW ARRIVAL ONLY</h1>
        <h1 className="md:text-5xl text-base md:font-semibold font-normal mt-2">
          New 👋<br /> Collection<br /><span className=" text-center">For</span> Everyone
        </h1>

        <button className= "hidden md:block bg-orange-600 text-white text-lg font-meduim rounded-full md:w-52 w-32 md:h-10 mt-4 relative md:pt-1 hover:bg-orange-500 hover:scale-105 duration-500">
          <p className='pr-4 md:text-base text-sm'>Latest Collection</p>
          <img className='relative md:left-44 right-3 bottom-5' src={arrow} height={9} width={20} />
        </button>

      </div>
      <div className="right h-full ">
        <img className='hero-women h-full w-auto ' src={women}  ></img>
      </div>
    </div>
  )
}

export default Hero
