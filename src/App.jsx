import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Product from './pages/Product.jsx';
import Shopcategory from './pages/ShopCategory.jsx';
import Login from './pages/LoginSignup.jsx';
import Footer from './components/Footer/Footer.jsx';
import Shopcontext from './Context/Shopcontext.jsx';
import All_product from './assets/ALLdata.js';
import mens_banner from './assets/mens_banner.jpg';
import womens_banner from './assets/womens_banner.jpg';
import kids_banner from './assets/kids_banner.jpg';
import SignIn from './components/SignIn/SignIn.jsx';
import Protected from './components/Protected/Protected.jsx';
import cartcontext from './Context/Cartcontext.jsx';
import { useEffect, useState } from 'react';
import Checkout from './pages/Checkout/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from './Slices/allproduct/Allproductthunk.ts';

function App() {
  const [Purchase, setPurchase] = useState({});
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state?.allProductlist?.data);
  console.log(allProducts,"allproducts");
  
  const contextvalue = { all_products: allProducts }



  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  return (
    <>

      <Router>

        <cartcontext.Provider value={{ Purchase, setPurchase }} >
          <Shopcontext.Provider value={contextvalue}>
            <Navbar />
            <Routes>
              <Route path='/' element={<Shop />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/Mens' element={<Shopcategory banner={mens_banner} category="Mens" />} />
              <Route path='/Womens' element={<Shopcategory banner={womens_banner} category="Womens" />} />
              <Route path='/Kids' element={<Shopcategory banner={kids_banner} category="Kids" />} />
              <Route path="/product" element={<Product />} ></Route>
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart/check-out" element={<Checkout />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cart' element={<Protected> <Cart /> </Protected>} />
            </Routes>
            <Footer />
          </Shopcontext.Provider>
        </cartcontext.Provider>
      </Router>  </>
  )
}

export default App
