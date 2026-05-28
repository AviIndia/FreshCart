
import api from "./api";

export const addCart = async (payload) => {

   const token = localStorage.getItem("token");

   const res = await api.post("cart/addCart.php",payload,

      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

   );

   return res.data;
};


export const getCartItems = async ()=>{
    const token = localStorage.getItem("token");
    const res = await api.get("/cart/getCartItems.php",

        {
            headers:{
               Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
    
}

export const updateCart = async (payload) => {

   const token = localStorage.getItem("token");

   const res = await api.post("/cart/updateCart.php",
      payload,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   );

   return res.data;

};

export const removeCartItem = async (payload) => {

   const token = localStorage.getItem("token");

   const res = await api.post("/cart/removeCart.php",payload,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   );

   return res.data;

};