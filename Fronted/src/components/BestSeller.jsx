import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';


const BestSeller = () => {

const {products} = useContext(ShopContext);
const [sellingCollection,setSellingCollection] = useState([]);

useEffect(()=>{
   const bestProduct = products.filter((item)=>(item.sellingCollection));
   setSellingCollection(bestProduct.slice(0,5))
},[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
          <Title text1={'SELLING'} text2={'COLLECTIONS!'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Don’t miss out on our top picks — these bestsellers are going fast, grab yours before they’re gone!
          </p>

      </div>
<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
        sellingCollection.map((item,index)=>(
        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    ))
}
    
</div>
    </div>
  )
}

export default BestSeller
