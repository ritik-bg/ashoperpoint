import React from 'react';
import Items from '../../components/items/Items';
import { useGetPopularProductQuery } from '../../Store/api/homeApi.js';
import { Loader } from '../Loader.jsx';

const Popular = () => {
    const { data, isLoading, error } = useGetPopularProductQuery({
        category: 'womens',
    });
    // console.log(error,'error');
    

    return (
        <div className="popular text-center ">
            {isLoading
                ? <Loader />
                : <>
                    <h1 className="font-semibold md:text-4xl text-xl my-5 ">Popular In Women</h1>
                    <hr />
                    <div className="popular-item flex px-6 gap-4 w-[100vw] md:w-auto overflow-x-auto">
                        {data?.length > 0 &&
                            data?.map((item, i) => {
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
                            })}
                    </div></>}
        </div>
    );
};

export default Popular;
