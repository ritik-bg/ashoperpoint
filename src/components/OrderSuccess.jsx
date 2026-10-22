import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="bg-orange-200 w-full p-6 flex flex-col items-center gap-3">
      <h1 className="text-xl font-bold text-black">Payment successful</h1>
      <p className="mb-0">Thank you for your order.</p>
      <p className="mb-0">
        Order ID: <strong>{orderId}</strong>
      </p>
      <Link to="/" className="mt-2 underline">
        Continue shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;