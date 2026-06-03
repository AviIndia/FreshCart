import api from "./api"

export const orderHistory = async ()=>{
    const token = localStorage.getItem("token");
    try {
       const res = await api.get("/order/myOrder.php",
        {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
         }
      }
       ) 
       return res.data
    } catch (error) {
        console.log(error)
    }
}

export const myorderDetails = async (id) => {
   const token = localStorage.getItem("token");
  
   try {

      const res = await api.get(`/order/getOrderdetails.php?order_id=${id}`,
         {
            headers: {
               Authorization: `Bearer ${token}`
            }
         }
      );

      return res.data;

   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const editUser = async (payload)=>{
   const token = localStorage.getItem("token")
   try {
      const res = await api.post("/auth/updateProfile.php",payload,
         {
            headers:{
               Authorization: `Bearer ${token}`
            }
         }
      )
      return res.data;
   } catch (error) {
      console.log(error)
   }
}

export const myProfile = async ()=>{
   const token = localStorage.getItem("token")
   try {
      
      const res = await api.get("/auth/profile.php",
         {
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
      )
      return res.data;
   } catch (error) {
      console.log(error)
   }
}

export const changePassword = async (payload)=>{
   const token = localStorage.getItem("token")
   try {
      const res = await api.post("/auth/changePassword.php",payload,
         {
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
      )
      return res.data;
   } catch (error) {
      console.log(error)
   }
}
export const setDefaultAddress = async (id) => {

   const token = localStorage.getItem("token");

   const res = await api.post(
      "/auth/setDefaultAddress.php",
      {
         address_id: id
      },
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   );

   return res.data;
};

export const deleteAddress = async (id) => {

   const token = localStorage.getItem("token");

   const res = await api.delete(
      "/auth/deleteUserAddress.php",
      {
         data: {
            address_id: id
         },
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   );

   return res.data;
};


export const addAddress = async (payload) => {

   const token = localStorage.getItem("token");

   const res = await api.post(
      "/auth/userAddress.php",
      payload,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   );

   return res.data;
};