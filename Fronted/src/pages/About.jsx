import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At Tamazur, we provide premium suit and dress rentals for all occasions —
            from weddings and formal events to business meetings and cultural celebrations.
            Our mission is to make high-end fashion accessible, affordable, and hassle-free.
          </p>

          <p>
            We believe that everyone deserves to look their best without breaking the bank.
            That’s why our collection includes modern, traditional, and designer outfits
            that can be rented easily, saving you time, money, and wardrobe space.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to redefine the way people experience fashion by promoting
            sustainability and smart shopping through rentals. We’re here to help you
            look elegant, feel confident, and leave a lasting impression — one outfit at a time.
          </p>
        </div>
      </div>

      <div className="text-1xl py-4 ">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            Every outfit in our collection is handpicked, cleaned, and quality-checked to ensure
            you receive garments in perfect condition — ready to wear and impress.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Easily browse, book, and return your outfits with our seamless rental process.
            Whether online or in-store, we make suit rentals simple and stress-free.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our team is here to help you choose the right outfit for your event and ensure
            a smooth rental experience from start to finish. Your satisfaction is our priority.
          </p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
