import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in again");
      navigate("/login");
      return;
    }

    try {
      let orderItems = [];
      for (const productId in cartItems) {
        const sizes = cartItems[productId];
        for (const size in sizes) {
          const quantity = sizes[size];
          if (quantity > 0) {
            const itemInfo = structuredClone(
              products.find((p) => p._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + Number(delivery_fee),
      };

      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Invalid payment method selected");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----------------------------Left Side---------------------------*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            placeholder="ZipCode"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          placeholder="Phone"
          required
        />
      </div>

      {/*---------------------Right Side----------------------*/}
      <div className="mt-8 flex flex-col gap-6">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div>
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex items-center gap-4 mt-2">
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-2 px-4 rounded-lg cursor-pointer transition 
                          ${method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              <p
                className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-blue-500' : ''}`}
              ></p>
              <p className="text-gray-700 font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 rounded-md hover:bg-gray-800 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
