// ShopContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext(); // ✅ parentheses zaroori hai

const ShopContextProvider = ({ children }) => {
  const currency = "Rs";
  const delivery_fee = "400";
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate()


  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)

      }
    }
  }


  const getCartCount = () => {

    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }

        } catch (error) {

        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }



  }
const getCartAmount = () => {
  let totalAmount = 0;
  for (const productId in cartItems) {
    const itemInfo = products.find((product) => product._id === productId);

    if (!itemInfo) {
      
      continue; // Skip this product
    }

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }
  return totalAmount;
};




  // Fetch products data from the backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/cart/get",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      const data = response.data.cartData;
      // ✅ Ensure cartData is always an object
      setCartItems(typeof data === "object" && data !== null ? data : {});
    } else {
      console.warn(response.data.message);
      if (response.data.message === "Not authorized") {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
      }
    }
  } catch (error) {
    console.error(error.message);
    setCartItems({});
  }
};


  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])



  const value = {
    products,
    currency,
    delivery_fee,
    search, setSearch, showSearch, setShowSearch, cartItems,setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setToken, token

  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
