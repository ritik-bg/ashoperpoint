import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsQuery } from '../Store/api/cartAPi';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';

const cart = () => {
  // const { Purchase } = useContext(cartcontext);
  const navigate = useNavigate();
  const { data: Purchase, isLoading, isFetching } = useGetCartItemsQuery({})
  const userdata = useSelector((state) => state.auth.user);
  // const total = (Purchase?.cart).reduce(
  //   (acc, item) => acc + item?.new_price * item?.quantity,
  //   0,
  // );
  console.log(Purchase?.cart?.items.length, 'Purchase');

  return (
    <div className=" text-black w-[100vw] h-[100vh] p-5 relative">
      <h1 className="text-2xl font-bold text-center">
        {' '}
        {userdata ? userdata?.name?.toLowerCase() : ''} Your Cart
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {
          (isLoading || isFetching) ? <Loader />
            : Purchase?.cart?.items.length > 0 ? (
              Purchase?.cart?.items.map((item) => (
                <div key={item?.id} className="bg-gray-300 p-4 rounded shadow">
                  <img src={item?.image} alt={item?.title} className="w-20 h-20 mx-auto" />
                  <h3 className="text-lg font-bold">{item?.title}</h3>
                  <p>Price: ${item?.new_price}</p>
                  <p>Quantity: {item?.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3"> Your cart is empty.</p>
            )}
      </div>
      {/* {total > 0 ? (
        <span className="bg-orange-500 p-2 rounded-md fixed bottom-4 right-5 text-white ">
          <button
            onClick={() => {
              navigate('/cart/check-out');
            }}
          >
            Procced To Pay
          </button>{' '}
          {'Rs.' + total} -&gt;{' '}
        </span>
      ) : null} */}
    </div>
  );
};

export default cart;
