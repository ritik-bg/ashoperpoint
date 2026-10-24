import React, { useContext, useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import cartcontext from '../../Context/Cartcontext';
import { useDispatch, useSelector } from 'react-redux';
import {  logout } from '../../Slices/auth/AuthSlice';
import { toast } from 'react-toastify';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetCartItemsQuery } from '../../Store/api/cartAPi';

const Navbar = () => {
  const [menu, setmenu] = useState('Shop');
  // const { Purchase, setPurchase } = useContext(cartcontext);
  const auth = useSelector((state) => state.auth?.user);
  const username = localStorage.getItem('user');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginPage = window.location.pathname ==='/signin';
  const { data: Purchase, isLoading, isFetching } = useGetCartItemsQuery({});

  const handlelogout = () => {
    if (username) {
      localStorage.clear();
      dispatch(logout());
      navigate('/signin');
    } else {
      toast.error('already logged out !');
    }
  };

  // useEffect(() => {
  //   setPurchase(Purchase);
  // }, [Purchase]);

  return (
    <div className="navbar md:bg-white bg-yellow-300 md:p-4 p-1  flex justify-between ">
      <div className="logo flex flex-row items-center">
        <FontAwesomeIcon icon={faBars} className="md:hidden h-5 w-10" />

        <Link className=" hidden md:block " to="/">
          <img src={logo} height={40} width={80} />
        </Link>
      </div>

      <ul className="hidden md:flex navul flex gap-10 items-center text-l font-semibold">
        <li
          onClick={() => {
            setmenu('Shop');
          }}
          className=" hover:scale-110 transition duration-300 cursor-pointer"
        >
          <Link to="/">Shop </Link>
          {menu === 'Shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu('Mens');
          }}
          className=" hover:scale-110 transition duration-300 cursor-pointer"
        >
          <Link to="/Mens">Mens</Link> {menu === 'Mens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu('Womens');
          }}
          className=" hover:scale-110 transition duration-300 cursor-pointer"
        >
          <Link to="/Womens">Womens </Link> {menu === 'Womens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu('Kids');
          }}
          className=" hover:scale-110 transition duration-300 cursor-pointer"
        >
          {' '}
          <Link to="/Kids">Kids</Link> {menu === 'Kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="others flex items-center gap-2">
        <Link to={username ? '' : '/signin'}>
          {' '}
          <button
            onClick={() => {
              username ? handlelogout() : '';
            }}
            className="login bg-black text-white  md:w-20 md:h-10 py-1 px-2 rounded-md"
          >
            {username ? 'Logout' : isLoginPage ?'x':'Login'}
          </button>
        </Link>
       {username && <Link className=" md:block" to="/cart">
          <img src={cart} height={20} width={40} />
        </Link>}
        {Purchase?.cart?.items?.length > 0 && !!auth && (
          <div className="cart-count">{(Purchase?.cart?.items).length}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
