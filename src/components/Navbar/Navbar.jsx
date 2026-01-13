import React, { useContext, useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import cart from '../../assets/cart.png'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import cartcontext from '../../Context/Cartcontext';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../Slices/auth/AuthSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menu, setmenu] = useState("Shop");
  const { Purchase, setPurchase } = useContext(cartcontext);
  const auth = useSelector((state) => state.auth);
  const username = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    if (username) {
      localStorage.clear();
       dispatch(logout());
       navigate("/signin")
    } else {
      toast.error("already logged out !")
    }
  }

  useEffect(() => {
    setPurchase(Purchase)
  }, [Purchase])

  return (
    <div className='navbar p-4  flex justify-between '>
      <div className="logo ">
        <Link to="/" ><img src={logo} height={40} width={80} /> </Link>
      </div>
      <ul className=' navul flex gap-10 items-center text-l font-semibold'>
        <li onClick={() => { setmenu("Shop") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/' >Shop </Link>{menu === "Shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Mens") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/Mens'>Mens</Link>  {menu === "Mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Womens") }} className=" hover:scale-110 transition duration-300 cursor-pointer"><Link to='/Womens'>Womens </Link> {menu === "Womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setmenu("Kids") }} className=" hover:scale-110 transition duration-300 cursor-pointer"> <Link to='/Kids'>Kids</Link>  {menu === "Kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="others flex items-center gap-2">
        <Link to={username? "" : '/signin'}> <button onClick={()=>{ username ? handlelogout() : ""}} className='login bg-black text-white  w-20 h-10 rounded-md'>{username  ? "Logout" : "Login"}</button></Link>
        <Link to='/cart'><img src={cart} height={20} width={40} /></Link>
        <div className="cart-count">{Object.keys(Purchase).length}</div>
      </div>
    </div>
  )
}

export default Navbar
