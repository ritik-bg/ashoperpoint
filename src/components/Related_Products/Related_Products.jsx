import React from 'react'
import Item from '../items/Items'
import { Loader } from '../Loader';
import { useGetLatestCollectionQuery } from '../../Store/api/homeApi';

const Related_Products = (props) => {

  const { category } = props;
  const { isLoading, isFetching, data: collection } = useGetLatestCollectionQuery({})
  const relatedCategory = collection?.data?.filter((i) => i.category === category);

  return (
    <div className="related h-auto ">
      <h2 className='text-center font-semibold text-3xl '>Related Products <hr className='h-[5px] w-44 align-middle bg-black mx-auto rounded-lg' /> </h2>
      <div className=" p-5 related-list h-auto  grid md:grid-cols-5 grid-cols-4">
        {(isLoading || isFetching) ? <Loader />
          : relatedCategory.map((item, i) => {
            return (<Item key={i} id={item._id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price} />)
          })
        }
      </div>
    </div>
  )
}

export default Related_Products ;
