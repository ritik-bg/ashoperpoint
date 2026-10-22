import React from 'react';
import { Link } from 'react-router-dom';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const Items = (props) => {
  const hasDiscount = Number(props.old_price) > Number(props.new_price);

  return (
    <div className="mx-2 mb-5">
      <Link to={`/product/${props.id}`} className="block">
        {/* Fixed 3:4 frame: every card has the same image size,
            and object-cover crops large/small images to fit without stretching */}
        <div className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
          <img
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            src={props.image}
            alt={props.name || 'product image'}
            loading="lazy"
          />
        </div>
      </Link>

      <p className="mt-2 px-1 text-sm md:text-base font-semibold text-center text-gray-900 line-clamp-2 min-h-[2.5rem]">
        {props.name}
      </p>

      <div className="mt-1 flex items-center justify-center gap-2">
        <span className="font-semibold text-gray-900">{inr(props.new_price)}</span>
        {hasDiscount && (
          <span className="text-sm text-gray-500 line-through">
            {inr(props.old_price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Items;