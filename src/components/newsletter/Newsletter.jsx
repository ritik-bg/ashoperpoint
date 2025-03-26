import React from 'react'

const Newsletter = () => {
  return (
    <div className="newsletter bg-gradient-to-b from-orange-300 to-white w-full h-[55vh] text-center">
<h1 className="text-4xl font-bold  pt-10 font-sans">Get Exclusive Offers On Your Email</h1>
<p className="text-xl pt-2 ">Subscribe to our Newsletter and Stay Updated</p>
<div className="input pt-16">
    <input className='pl-4 w-[30vw] h-10 rounded-md ' type='text' placeholder='Enter Your E-mail Add.' name='newsletter'/>
    <button className='w-[10vw] bg-black text-white h-10 rounded-md ml-4 hover:scale-105 duration-300' >Subscribe</button>
</div>
    </div>
  )
}

export default Newsletter
