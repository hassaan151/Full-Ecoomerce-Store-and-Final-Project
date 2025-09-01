import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 sm:text-sm md:text-base text-gray-700'>
      
     <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Security Policy</p>
        <p className='text-gray-400'>10k deposit ensures care & responsibility, 100% refundable</p>
     </div>
     <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Professional Dry Cleaning Included</p>
        <p className='text-gray-400'>Every suit delivered freshly cleaned & ready to wear</p>
     </div>
     <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>We provide 24/7 customer support for all your rental needs</p>
     </div>

    </div>
  )
}

export default OurPolicy
