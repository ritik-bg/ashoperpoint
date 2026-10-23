import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Related_Products from '../Related_Products/Related_Products';
import cartcontext from '../../Context/Cartcontext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useAddToCartMutation, useGetCartItemsQuery } from '../../Store/api/cartAPi';
import { useSelector } from 'react-redux';
import ProductSkeleton from './ProductPageSimmer';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const Productdisplay = (incomingprops) => {
  // const { Purchase, setPurchase } = useContext(cartcontext);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const [addToCart] = useAddToCartMutation();
   const  { data:Purchase, isLoading , isSuccess} = useGetCartItemsQuery({});
  const isMobile = window.innerWidth < 1024;
  const { product } = incomingprops;
  const images = product.images?.length ? product.images : [product.image];
  const hasDiscount = product.old_price > product.new_price;
  const discount = hasDiscount
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  // const Additem = (product) => {
  //   setPurchase((prevcart) => ({
  //     ...prevcart,
  //     [product.id]: prevcart[product.id]
  //       ? { ...prevcart[product.id], quantity: prevcart[product.id].quantity + 1 }
  //       : { ...product, quantity: 1 },
  //   }));
  // };

  // console.log(Purchase,'Purchase total');
  

  const handleItem = async (item) => {
    if (token) {
      // Additem(product);
      // Purchase
      const payload={
        productId:product?._id,
        quantity:1
      }
      const res = await addToCart(payload).unwrap();
      // console.log(res,'adding to response');
      
      if (res.success) {
        toast.success(res?.message || res?.data?.message);
      } else {
        toast.error(res?.message || res?.data?.message|| 'Unable to add Item!');
      }
     
    } else {
      toast.error('Please Login To Purchase item!');
    }
  };

  return (
    <div className="bg-white">
      {!product ? <ProductSkeleton />
        : <div className="mx-auto  px-4 py-6 md:py-10 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {/* ---------- Gallery ---------- */}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              {/* thumbnails: row on mobile, column on desktop */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-md overflow-hidden border-2 ${activeImg === i ? 'border-gray-900' : 'border-transparent'
                        }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden aspect-[3/4]">
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ---------- Details ---------- */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">{product.category}</p>
              <h1 className="mt-1 text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="mt-2 flex items-center gap-1 text-amber-500" aria-label="Rated 4.5 out of 5">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <span className="ml-2 text-sm text-gray-500">4.5</span>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {inr(product.new_price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {inr(product.old_price)}
                    </span>
                    <span className="text-sm font-semibold text-green-700">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                GST and delivery charges are shown at checkout.
              </p>

              <p className="mt-5 text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Size */}
              <div className="mt-6">
                <h2 className="text-base font-semibold text-gray-900">Select size</h2>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={size === s}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      className={`min-w-12 h-11 px-3 rounded-md border text-sm font-medium transition-colors ${size === s
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-2 text-sm text-red-700" role="alert">
                    Please select a size.
                  </p>
                )}
              </div>

              {/* Add to cart: fixed bar on mobile, inline on desktop */}
              <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-200 p-3 md:static md:z-auto md:border-0 md:p-0 md:mt-8">
                <button
                  type="button"
                  onClick={handleItem}
                  className="w-full md:w-auto md:min-w-56 h-12 px-8 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-700 active:scale-[0.99] transition"
                >
                  Add to cart
                </button>
              </div>

              {/* Meta */}
              <dl className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-700 space-y-2">
                <div className="flex gap-2">
                  <dt className="font-semibold">Category:</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className="flex gap-2 items-center">
                  <dt className="font-semibold">Tags:</dt>
                  <dd className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100">Fashion</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100">Modern</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>}

      <Related_Products category={product.category} />
    </div>
  );
};

export default Productdisplay;
