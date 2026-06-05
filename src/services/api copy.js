import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost/php_ecom_api",
   timeout: 10000,
});

api.interceptors.request.use(
   (config) => {

      const token = localStorage.getItem("token");

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

   },
   (error) => Promise.reject(error)
);

api.interceptors.response.use(
   (response) => response,
   (error) => {

      if (error.response?.status === 401) {

         localStorage.removeItem("token");
         localStorage.removeItem("user");

         window.location.href = "/signin";
      }

      return Promise.reject(
         error.response?.data || {
            status: false,
            message: "Server Error"
         }
      );
   }
);

export default api;