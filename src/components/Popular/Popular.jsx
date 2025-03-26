import React from 'react'
import data from '../../assets/data.js'
import Items from '../../components/items/Items'

const Popular = () => {
  return (
    <div className="popular text-center ">
        <h1 className='font-semibold text-4xl my-5 font-light'>Popular In Women</h1><hr/>
   
    <div className="popular-item flex px-6 gap-4">
        {data.map((item,i)=>{
            return <Items key={i} id={item.id} name = {item.name} image = {item.image} old_price = {item.old_price} new_price = {item.new_price} />
        })}
         </div> </div>
  )
}

export default Popular
