import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../services/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [summary,setSummary] = useState([]);

const loadCartItems = async () => {

   const token = localStorage.getItem("token");

   // LOGIN USER
   if (token) {

      try {

         const res = await getCartItems();

         if (res.status) {

            const normalizedItems =
               (res.data.items || []).map((item) => ({
                  ...item,
                  qty: item.quantity
               }));

            setCartItems(normalizedItems);
            setSummary(res.data.summary)

            setCartCount(
               res.data.summary.total_items || 0
            );

         }

      } catch (error) {

         console.log(error);

      }

   }

   // GUEST USER
   else {

      const guestCart =
         JSON.parse(localStorage.getItem("guest_cart")) || [];

      setCartItems(guestCart);

      setCartCount(guestCart.length);

   }

};

   useEffect(() => {

      loadCartItems();

   }, []);

   return (

      <CartContext.Provider
         value={{
            cartItems,
            setCartItems,
            cartCount,
            setCartCount,
            loadCartItems,summary,setSummary
         }}
      >

         {children}

      </CartContext.Provider>

   );

};

export const useCart = () => useContext(CartContext);