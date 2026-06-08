import login from "../assets/images/signin.png"
import { useNavigate } from "react-router-dom";
import { syncGuestCartToServer } from "../utils/syncGuestCart";
import { useState } from "react";
import { userLogin } from "../services/signin";
import { useWishlist } from "../context/WishlistContext";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { sendOtp, verifyOtp } from "../services/user";
import Swal from "sweetalert2";

const Signin = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("");
   const { syncGuestWishlist, loadWishListItems } = useWishlist()
   const navigate = useNavigate()
   const handleLogin = async (e) => {

      e.preventDefault();

      const res = await userLogin(email, password);

      console.log(res);

      if (res.status) {

         localStorage.setItem("token", res.data.token);
         localStorage.setItem("id", res.data.user.id);
         localStorage.setItem("f_name", res.data.user.f_name);
         localStorage.setItem("l_name", res.data.user.l_name);
         localStorage.setItem("email", res.data.user.email);
         localStorage.setItem("role", res.data.user.role);
         await syncGuestCartToServer();
         await syncGuestWishlist();
         await loadWishListItems();
         navigate("/Checkout");

      } else {

         alert(res.message);

      }

   };

   const [showOtpLogin, setShowOtpLogin] = useState(false);
   const [otpEmail, setOtpEmail] = useState("");
   const [otp, setOtp] = useState("");
   const [otpSent, setOtpSent] = useState(false);

const handleSendOtp = async (e) => {

   e.preventDefault();

    // Loading popup
     Swal.fire({
       title: "Please wait...",
       text: "Processing your request",
       allowOutsideClick: false,
       didOpen: () => {
         Swal.showLoading();
       }
     });
   

   try {

      const res = await sendOtp({
         email: otpEmail
      });

      console.log("SEND OTP RESPONSE =>", res);
       // Loading close
          Swal.close();
      if (res.status) {
         setOtpSent(true);
         Swal.fire({
                 icon: "success",
                 title: "Success",
                 text: res.message
               });
      } else {
         alert(res.message);
      }

   } catch (error) {

      console.log(error);
      console.log(error?.response?.data);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Sending Failed"
          });

   }

};

   const handleVerifyOtp = async (e) => {

      e.preventDefault();

      const res = await verifyOtp({
         email: otpEmail,
         otp
      });

      if (res.status) {

         localStorage.setItem(
            "token",
            res.data.token
         );

         localStorage.setItem(
            "id",
            res.data.user.id
         );

         localStorage.setItem(
            "name",
            `${res.data.user.f_name} ${res.data.user.l_name}`
         );

         localStorage.setItem(
            "email",
            res.data.user.email
         );

         localStorage.setItem(
            "role",
            res.data.user.role
         );

         await syncGuestCartToServer();
         await syncGuestWishlist();
         await loadWishListItems();

         navigate("/Checkout");

      } else {
         alert(res.message);
      }

   };
   return (
      <>
         <Header />
         <section className="my-lg-10 my-3">
            <div className="container">
               {/* row */}
               <div className="row justify-content-center align-items-center">
                  <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                     {/* img */}
                     <img src={login} alt="" className="img-fluid" />
                  </div>
                  {/* col */}
                  <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                     <div className="mb-lg-9 mb-5">
                        <h1 className="mb-1 h2 fw-bold">Sign in to Grocery</h1>
                        <p>Welcome back to grocery! Enter your email to get started.</p>
                     </div>

                     {
   !showOtpLogin ? (

      <>
         <form
            className="needs-validation"
            noValidate
            onSubmit={handleLogin}
         >

            <div className="row g-3">

               <div className="col-12">

                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />

               </div>

               <div className="col-12">

                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />

               </div>

               <div className="d-flex justify-content-between">

                  <div className="form-check">

                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                     />

                     <label
                        className="form-check-label"
                        htmlFor="rememberMe"
                     >
                        Remember me
                     </label>

                  </div>

               </div>

               <div className="col-12 d-grid">

                  <button
                     type="submit"
                     className="btn btn-primary"
                  >
                     Sign In
                  </button>

               </div>

            </div>

         </form>

         <div className="text-center mt-3">

            <button
               type="button"
               className="btn btn-link text-decoration-none"
               onClick={() => {
                  setShowOtpLogin(true);
                  setOtpSent(false);
                  setOtp("");
                  setOtpEmail("");
               }}
            >
               Login with Email OTP
            </button>

         </div>
      </>

   ) : (

      <div className="card">

         <div className="card-body">

            <h5 className="mb-4">
               Login With Email OTP
            </h5>

            <form
               onSubmit={
                  otpSent
                     ? handleVerifyOtp
                     : handleSendOtp
               }
            >

               <div className="mb-3">

                  <input
                     type="email"
                     className="form-control"
                     placeholder="Enter Email"
                     value={otpEmail}
                     onChange={(e) =>
                        setOtpEmail(e.target.value)
                     }
                     disabled={otpSent}
                     required
                  />

               </div>

               {
                  otpSent && (

                     <div className="mb-3">

                        <input
                           type="text"
                           className="form-control"
                           placeholder="Enter OTP"
                           value={otp}
                           onChange={(e) =>
                              setOtp(e.target.value)
                           }
                           required
                        />

                     </div>

                  )
               }

               <div className="d-grid">

                  <button
                     type="submit"
                     className="btn btn-success"
                  >
                     {
                        otpSent
                           ? "Verify OTP"
                           : "Send OTP"
                     }
                  </button>

               </div>

               <div className="text-center mt-3">

                  <button
                     type="button"
                     className="btn btn-link text-decoration-none"
                     onClick={() => {
                        setShowOtpLogin(false);
                        setOtpSent(false);
                        setOtp("");
                        setOtpEmail("");
                     }}
                  >
                     Back to Password Login
                  </button>

               </div>

            </form>

         </div>

      </div>

   )
}
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </>
   )
}
export default Signin