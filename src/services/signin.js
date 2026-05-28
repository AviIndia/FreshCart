import api from "./api";

export const userLogin = async (email,password) => {

   try {

      const payload = {email,password};

      const res = await api.post("/auth/login.php",payload);

      return res.data;

   } catch (error) {

      console.log(error);

      return {
         status: false,
         message: "Login failed"
      };

   }

};