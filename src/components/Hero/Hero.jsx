import React from 'react'
import women from '../../assets/women.png';
import arrow from '../../assets/arrow.png'


const Hero = () => {
  return (
    <div className='hero flex justify-between pl-6 pr-0 bg-yellow-300 h-[70vh] w-full items-center text-xl font-semibold'>
      <div className="left p-14 h-full">
        <h1>NEW ARRIVAL ONLY</h1>
        <h1 className="text-5xl font-semibold mt-2">
          New 👋<br /> Collection<br /><span className=" text-center">For</span> Everyone
        </h1>

        <button className="bg-orange-600 text-white text-lg font-meduim rounded-full w-52 h-10 mt-4 relative pt-1 hover:bg-orange-500 hover:scale-105 duration-500">
          <p className='pr-4'>Latest Collection</p>
          <img className='relative left-44 bottom-5' src={arrow} height={9} width={20} />
        </button>

      </div>
      <div className="right h-full ">
        <img className='hero-women h-full w-auto ' src={women}  ></img>
      </div>
    </div>
  )
}

export default Hero
