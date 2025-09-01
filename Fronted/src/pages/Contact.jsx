import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { FaInstagram } from 'react-icons/fa'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="flex flex-col my-10 justify-center md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Lahore, Pakistan 54000 <br />House No:  281 Shadman 1 Lahore</p>
          <p className='text-gray-500'>Tel: +92-321-9425634 <br />Email: bloredgamerz123@gmail.com</p>
          <p className='text-gray-500'>
            We specialize in premium suit rentals for all occasions — style, without the full price.
          </p>

          <p className='text-gray-500'>
            Get stylish suits for rent — perfect for weddings, events, and special occasions.
          </p>
            
          <a
            href="https://www.instagram.com/_tamazur_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block  mt-4  px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 ease-in-out animate-bounce"
          >
            Follow us on Instagram
          </a>

        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
