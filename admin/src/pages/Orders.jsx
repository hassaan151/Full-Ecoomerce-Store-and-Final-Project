import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) setOrders(response.data.orders.reverse());
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      fetchAllOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Delete handler
  const deleteOrderHandler = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/delete`,
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl font-bold mb-4">Orders Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 rounded-lg p-4 md:p-6 mb-4 shadow-sm"
          >
            {/* ICON */}
            <img className="w-12" src={assets.parcel_icon} alt="icon" />

            {/* ORDER DETAILS */}
            <div>
              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="py-0.5">
                    {item.name} x {item.quantity} <span className="text-gray-500">{item.size}</span>
                    {i !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName} {order.address.lastName}</p>
              <div className="text-gray-600">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className="text-gray-700">{order.address.phone}</p>
            </div>

            {/* STATUS */}
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>
              <p className={`px-2 py-1 rounded-full text-xs font-semibold ${order.payment ? 'text-gray-900' : 'text-red-500'}`}>
                Payment: {order.payment ? 'Done' : 'Pending'}
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* PRICE */}
            <p className="text-sm sm:text-[15px] font-medium">{currency}{order.amount}</p>

            {/* DROPDOWN + DELETE BUTTON */}
            <div className="flex flex-col gap-2">
              <select
                className="text-sm border border-gray-300 bg-white rounded-md px-2 py-1 mt-2 cursor-pointer focus:ring-1 focus:ring-blue-400 focus:outline-none w-auto"
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Order Placed">📥 Order Placed</option>
                <option value="Packing">📦 Packing</option>
                <option value="Shipped">🚚 Shipped</option>
                <option value="Out for Delivery">📍 Out For Delivery</option>
                <option value="Delivered">✅ Delivered</option>
              </select>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                onClick={() => deleteOrderHandler(order._id)}
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
