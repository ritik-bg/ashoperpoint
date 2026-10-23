import React from 'react';
import Items from '../items/Items';
import { useGetLatestCollectionQuery } from '../../Store/api/homeApi';
import { Loader } from '../Loader';

const Latest_collection = () => {
  const { isLoading, isFetching, data: collection } = useGetLatestCollectionQuery({});
  // console.log(collection,'new collection');

  return (
    <>
      <div className="latest w-100">
        <h1 className="font-semibold md:text-4xl text-xl my-5  text-center inline-block w-full ">New Collection</h1>
        {isFetching || isLoading ? (
          <Loader />
        ) : (
          <div className="new-collection grid md:grid-cols-5 grid-cols-3 justify-around md:px-8 px-2 ">
            {!!collection && collection?.data?.length > 0 ? (
              (collection?.data || [])?.map((item, i) => {
                // console.log(item,'single item');

                return (
                  <Items
                    key={i}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    old_price={item.old_price}
                    new_price={item.new_price}
                  />
                );
              })
            ) : (
              <span>No new Collections Added!</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Latest_collection;
