import { createContext, useContext, useEffect, useState } from "react";
import { addCart, getCartItems } from "../services/cart";
import Swal from "sweetalert2";
import { addToGuestCart } from "../utils/cartHelper";

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
            setSummary(res.data.summary);
            //console.log(res.data.summary)

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

      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

      setCartItems(guestCart);

      setCartCount(guestCart.length);

   }

};

   useEffect(() => {

      loadCartItems();

   }, []);

      /* ======================= ADD TO CART================ */
   
   const addToCart = async (product, qty = 1) => {
   
      const token = localStorage.getItem("token");
   
      // LOGGED USER
      if (token) {
   
         try {
   
            const payload = {
               product_id: product.product_id,
               qty: qty
            };
   console.log(product)
            const res = await addCart(payload);
   
            if (res.status) {
   
               await loadCartItems();
   
               
                   Swal.fire({
                           icon: "success",
                           title: "Success",
                           text: "Product Added to cart",
                           });
   
            }
   
         } catch (error) {
   
            console.log(error);
   
         }
   
      }
   
      // GUEST USER
      else {
   
         const updatedCart = addToGuestCart({
            ...product,
            qty
         });
   
         setCartItems(updatedCart);
   
         setCartCount(updatedCart.length);
   
             Swal.fire({
            icon: "success",
            title: "Success",
            text: "Product added to guest cart",
            });
   
      }
   
   };

   return (

      <CartContext.Provider
         value={{
            cartItems,
            setCartItems,
            cartCount,
            setCartCount,
            loadCartItems,summary,setSummary,addToCart
         }}
      >

         {children}

      </CartContext.Provider>

   );

};

export const useCart = () => useContext(CartContext);