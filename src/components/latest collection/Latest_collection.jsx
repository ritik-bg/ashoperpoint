import React, { useEffect } from 'react'
import Items from '../items/Items'
import { useDispatch, useSelector } from 'react-redux'
import { getNewCollections } from '../../Slices/allproduct/Allproductthunk'

const Latest_collection = () => {

  const collection = useSelector((state)=>state.allProductlist.newCollection) ;
  const dispatch = useDispatch();

  useEffect(() => {
 const load = async () => {
    const data = await dispatch(getNewCollections());
    if (data) console.log("loaded", data);
  };
  load();
  }, [])
  


  return (
    <div className="latest">
      <h1 className='font-semibold md:text-4xl text-xl my-5  text-center inline-block w-full '>New Collection</h1>
      <div className="new-collection grid grid-cols-3 justify-around md:px-8 px-2 ">
        {collection.map((item, i) => {
          return <Items key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price} />
        })}
      </div>
    </div>
  )
}

export default Latest_collection
