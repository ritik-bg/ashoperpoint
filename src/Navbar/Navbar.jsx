import React, { useContext, useState , useEffect } from 'react'
import logo from '../assets/logo.png'
import cart from '../assets/cart.png'



import './Navbar.css';
import { Link } from 'react-router-dom';
import cartcontext from '../Context/Cartcontext';



const Navbar = () => {
  const [menu, setmenu] = useState("Shop")
  const {Purchase , setPurchase} = useContext(cartcontext) 



useEffect(() => {
 
  setPurchase(Purchase)
 
   }, [Purchase])
 


  return (
    <div className='navbar p-4  flex justify-between '>
      <div className="logo ">
        <img src={logo} height={40} width={80} />
      </div>
      <ul className=' navul flex gap-10 items-center text-l font-semibold'>
        <li onClick={() => { setmenu("Shop") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/' >Shop </Link>{menu === "Shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Mens") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/Mens'>Mens</Link>  {menu === "Mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Womens") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/Womens'>Womens </Link> {menu === "Womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Kids") }} className=" hover:scale-110 transition duration-300 cursor-pointer"> <Link to='/Kids'>Kids</Link>  {menu === "Kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="others flex items-center gap-2">
      <Link to='/login'> <button className='login bg-black text-white  w-20 h-10 rounded-md'>Login</button></Link>
        <Link to='/cart'><img src={cart} height={20} width={40} /></Link>
        <div className="cart-count">{Object.keys(Purchase).length}</div>
      </div>
    </div>
  )
}

export default Navbar
