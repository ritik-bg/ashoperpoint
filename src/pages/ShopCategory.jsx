import React, { useContext } from 'react'
import Shopcontext from '../Context/Shopcontext'
import Item from '../components/items/Items'

const ShopCategory = ({ category, banner }) => {  // Destructure props here
  const { all_products } = useContext(Shopcontext);

  const categoryProducts = all_products ? 
    all_products.filter((item) => item.category === category) : 
    [];

  return (
    <div className="shop-category">
      <img src={banner} alt='banner' />
      <div className="shopcategory-product grid grid-cols-3 mt-4 gap-5 px-2">
        {categoryProducts.map((item, i) => (
          <Item 
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory
