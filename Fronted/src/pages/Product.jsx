import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    // Jab product change ho to scroll up ho
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [productId]);

  useEffect(() => {
  // Jab product change ho to size reset ho jaye
  setSize('');
}, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Products  Data*/}
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Products  image*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -----------------Products  Info----------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5  text-3xl  font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button 
                    onClick={() => setSize(size === item ? '' : item)} 
                    className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-3 mt-4">
            {/* ADD TO CART Button */}
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 cursor-pointer text-sm active:bg-gray-700'>
              ADD TO CART
            </button>

            {/* RENT NOW Button */}
            <button
              className='bg-green-600 text-white px-8 py-3 cursor-pointer text-sm active:bg-green-700'
              onClick={() => {
                const phoneNumber = "923219425634"; 
                const selectedSize = size ? size : "Not selected";

                // Message jo auto fill hoga
                const message = `Hello, I want to rent this suit:%0A
         Name: ${productData.name}%0A
         Price: ${currency}${productData.price}%0A
         Size: ${selectedSize}%0A
          -----------------------%0A
          Please confirm availability.`;

                const url = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(url, "_blank");
              }}
            >
              RENT NOW
            </button>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Orignial Product</p>
            <p>Security Deposit is Refundable</p>
            <p>Suit viewing and pickup at our studio</p>
          </div>
        </div>
      </div>

      {/* -----------------Description & Review Section----------------*/}
      <div className="mt-16">
        {/* Tabs */}
        <div className="flex border-b">
          <button className="px-6 py-3 text-sm font-medium transition-all duration-300 border-b-2 border-black text-black">
            Description
          </button>
          <button className="px-6 py-3 text-sm font-medium transition-all duration-300 text-gray-500 hover:text-black hover:border-b-2 hover:border-black">
            Reviews (122)
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-md px-6 py-6 text-sm text-gray-700 leading-relaxed">
          <p>
            Our rental suits are <b>100% hygienic & dry-cleaned</b> before
            every use. Flexible rental duration available from 1–7 days.
            Refundable security deposit required.
          </p>
          <p className="mt-3">
            You can <b>visit our studio</b> to view and collect the suit.
            Pickup & drop service also available in selected areas.
          </p>
        </div>
      </div>

      {/* -----------------Display Related Product----------------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'> </div>
}

export default Product
