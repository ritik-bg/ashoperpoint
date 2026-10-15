import React from 'react'

const Newsletter = () => {
  return (
    <div className="newsletter bg-gradient-to-b from-orange-300 to-white w-full md:h-[55vh] text-center">
<h1 className="md:text-4xl font-bold  pt-10 font-sans">Get Exclusive Offers On Your Email</h1>
<p className="md:text-xl pt-2 ">Subscribe to our Newsletter and Stay Updated</p>
<div className="input pt-16">
    <input className='pl-4 md:w-[30vw] h-10 rounded-md ' type='text' placeholder='Enter Your E-mail Add.' name='newsletter'/>
    <button className='md:w-[10vw] bg-black text-white md:h-10 px-3 py-2 rounded-md ml-4 hover:scale-105 duration-300' >Subscribe</button>
</div>
    </div>
  )
}

export default Newsletter
