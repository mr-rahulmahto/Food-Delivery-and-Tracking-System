/* eslint-disable react-refresh/only-export-components */


import { useCallback, useState } from "react";
import { createContext } from "react";
import Card from "../pages/Cart/Card"
import React from "react";
import { useEffect } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Initialize with an empty object

  // This state will hold the count of items in the cart
  // It will be an object where keys are item IDs and values are counts

  const url = import.meta.env.VITE_BACKEND_URL || "https://food-backend-1olw.onrender.com";
  const [token , setToken] = useState("");
 const [food_list , setFoodList] = useState([])


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url +"/api/cart/add" , {itemId} ,{headers:{token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token ){
      await axios.post(url +"/api/cart/remove" , {itemId} ,{headers:{token}})
    }
  };

  // This function adds an item to the cart or increments its count if it already exists
  // It checks if the item is already in the cart and updates the count accordingly

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId]>0) {
        let itemInfo = food_list.find((product)=>product._id == itemId);
        totalAmount += itemInfo.price * cartItems[itemId];
      }

    }
    return totalAmount;
  }

  const fetchFoodList = useCallback(async () =>{
     const response = await axios.get(url+"/api/food/list");
     setFoodList(response.data.data)
  }, [url])

  const loadCardData = useCallback(async (token) => {
    const response = await axios.post(url+"/api/cart/get" ,{} , {headers:{token}});
     setCartItems(response.data.cartData);
  }, [url])

  useEffect (()=>{
      // if(localStorage.getItem("token")){
      //   setToken(localStorage.getItem("token"))
      // }
      async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
          await loadCardData(localStorage.getItem("token"));
        }
      }
      loadData();
  } ,[fetchFoodList, loadCardData])

  const contextValue = {
    // Define your context values here
    // For example, you can add state management, functions, etc.
    food_list,
    // State to manage the count of items in the cart

    cartItems,
    setCartItems,
    // Functions to add and remove items from the cart
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

