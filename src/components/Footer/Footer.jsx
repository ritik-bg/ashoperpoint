import React from 'react'
import logo from '../../assets/logo.png'
import facebook from '../../assets/fb.png'
import instagram from '../../assets/insta.png'
import whatsap from '../../assets/whatsap.png'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
   <div className="footer w-full  ">
    
 
        <img className='logo mx-auto' src={logo} height={100} width={100}/>
   
   <ul className="links flex justify-center gap-x-12 font-medium pt-4">
    <li>Company</li>
    <li>Product</li>
    <li>Office</li>
    <li>About</li>
    <li>Consumer</li>
   </ul>
   <ul className="social flex gap-20 justify-center pt-5">
    <li> <Link to="https://www.instagram.com/theriti_k/" > <img src ={instagram} height={50} width={50} alt='Insta-handle-img'/></Link></li>
    <li><Link to="https://www.facebook.com/profile.php?id=100015671325377"><img src ={facebook} height={50} width={60} alt='Fb-handle-img'/></Link></li>
    <li><Link to="https://wa.me/7037003577"> <img src ={whatsap} height={50} width={50} alt='Whatsap-handle-img'/></Link></li>
   </ul>

   <div className="copyright text-center">
    <hr className='border border-gray-100'/>
    <p>Copyright@2023 - ALL RIGHTS RESERVED</p>
   </div>
    
   </div>
  )
}

export default Footer
