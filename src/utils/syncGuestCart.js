import { addCart } from "../services/cart";

export const syncGuestCartToServer = async () => {

   const guestCart =
      JSON.parse(localStorage.getItem("guest_cart")) || [];

   // CART EMPTY
   if (guestCart.length === 0) return;

   try {

      for (const item of guestCart) {

         const payload = {
            product_id: item.product_id || item.id,
            quantity: item.quantity
         };

         await addCart(payload);

      }

      // CLEAR GUEST CART
      localStorage.removeItem("guest_cart");

   } catch (error) {

      console.log(error);

   }

};