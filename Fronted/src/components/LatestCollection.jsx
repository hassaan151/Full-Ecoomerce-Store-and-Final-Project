import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [rentalCollection, setRentalCollection] = useState([]);

    useEffect(() => {
        setRentalCollection(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RENTAL'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm text-gray-600'>
                     Fresh styles, just dropped — explore the newest arrivals making waves this season.
</p>

            </div>
              {/* Rendering Products */}
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
{
    rentalCollection.map((item,index)=>(
        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    ))
}
              </div>

        </div>
    )
}

export default LatestCollection
