import api from "./api";

export const placeOrder = async (data) => {

   const token = localStorage.getItem("token");

   const res = await api.post(
      "/order/placeOrder.php",
      data,
      {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
         }
      }
   );

   return res.data;
};