export const addToGuestCart = (product) => {

   let cart =
      JSON.parse(localStorage.getItem("guest_cart")) || [];

   const existingProduct = cart.find(
      item => item.product_id === product.id
   );

   if (existingProduct) {

      existingProduct.qty += 1;

   } else {

      cart.push({
         product_id: product.id,
         qty: 1,
         name: product.name,
         price: product.final_price,
         thumbnail: product.thumbnail
      });

   }

   localStorage.setItem(
      "guest_cart",
      JSON.stringify(cart)
   );

   return cart;
};

export const updateGuestCartQty = (productId, type) => {

   let cart =
      JSON.parse(localStorage.getItem("guest_cart")) || [];

   cart = cart.map((item) => {

      if (item.product_id === productId) {

         let qty = item.qty || 1;

         if (type === "increase") {

            qty++;

         } else {

            qty--;

            if (qty < 1) qty = 1;

         }

         return {
            ...item,
            qty
         };

      }

      return item;

   });

   localStorage.setItem(
      "guest_cart",
      JSON.stringify(cart)
   );

   return cart;

};

export const removeGuestCartItem = (productId) => {

   let cart =
      JSON.parse(localStorage.getItem("guest_cart")) || [];

   cart = cart.filter(
      (item) => item.product_id !== productId
   );

   localStorage.setItem(
      "guest_cart",
      JSON.stringify(cart)
   );

   return cart;

};

