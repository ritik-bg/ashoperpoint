import React from 'react'
import collection from '../../assets/New_collection'
import Items from '../items/Items'

const Latest_collection = () => {
  return (
    <div className="latest">
         <h1 className='font-semibold text-4xl my-5  text-center inline-block w-full '>New Collection<hr className='bg-gradient-to-r from-gray-500 to-gray-50  border-2' /></h1>
    <div className="new-collection grid grid-cols-3 justify-around px-8 ">
    {collection.map((item,i)=>{
  return <Items key={i} id={item.id} name = {item.name} image = {item.image} old_price = {item.old_price} new_price = {item.new_price}/>
})}
    </div>
    </div>
  )
}

export default Latest_collection
