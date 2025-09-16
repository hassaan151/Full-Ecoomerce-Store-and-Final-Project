import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600 '>
                    Tamazur is your one-stop destination for the latest products, top-selling collections, and reliable customer service. Whether you're upgrading your lifestyle or finding something special, we bring you quality, affordability, and a smooth shopping experience you can trust. Join thousands of satisfied customers who choose Tamazur for fast delivery, curated picks, and everyday value.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>

                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+92-321-9425634</li>
                        <li>bloredgamerz123@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ tamazur.com - All Right Reserved.</p>
            </div>
              {/* 👇 Visible Admin Button */}
        <div className="text-center mt-3">
          <a
            href="https://ecommerce-admin-panel-lake.vercel.app" // 👈 apna admin panel ka live link daalna
            className="inline-block px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
          >
            Admin Panel
          </a>
        </div>
        </div>
    )
}

export default Footer
