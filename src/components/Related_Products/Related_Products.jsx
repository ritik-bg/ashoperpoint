import React from 'react'
import Products from '../../assets/New_collection'
import Item from '../items/Items'

const Related_Products = (props) => {

    const {category} = props ;
    const relatedCategory = Products.filter((i) => i.category === category);

  return (
    <div className="related h-auto w-[100vw]">
    <h2 className='text-center font-semibold text-3xl '>Related Products <hr className='h-[5px] w-44 align-middle bg-black mx-auto rounded-lg' /> </h2> 
    
    <div className=" p-5 related-list h-auto  grid grid-cols-3">
  
  {
   

   
        relatedCategory.map((item,i)=>{
        return (<Item key= {i} id={item.id} name = {item.name} image = {item.image} old_price = {item.old_price} new_price = {item.new_price} />)
    })
  }

  
    </div>
  </div>
  )
}

export default Related_Products
