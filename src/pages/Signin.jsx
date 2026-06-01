import login from "../assets/images/svg-graphics/signin-g.svg"
import { useNavigate } from "react-router-dom";
import { syncGuestCartToServer } from "../utils/syncGuestCart";
import { useState } from "react";
import { userLogin } from "../services/signin";
import { useWishlist } from "../context/WishlistContext";

const Signin = ()=>{
   const [email, setEmail] = useState("")
const [password, setPassword] = useState("");
   const { syncGuestWishlist, loadWishListItems } = useWishlist()
   const navigate = useNavigate()
   const handleLogin = async (e) => {

   e.preventDefault();

   const res = await userLogin(email, password);

   console.log(res);

   if (res.status) {

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("id",res.data.user.id);
      localStorage.setItem("name",res.data.user.name);
      localStorage.setItem("email",res.data.user.email);
      localStorage.setItem("role",res.data.user.role);
      await syncGuestCartToServer();
      await syncGuestWishlist();
      await loadWishListItems();
      navigate("/Checkout");

   } else {

      alert(res.message);

   }

};    return(
        <>
        <section className="my-lg-14 my-8">
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
                        <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                        <p>Welcome back to FreshCart! Enter your email to get started.</p>
                     </div>

                    <form
   className="needs-validation"
   noValidate
   onSubmit={handleLogin}
>

   <div className="row g-3">

      {/* EMAIL */}
      <div className="col-12">

         <label
            htmlFor="formSigninEmail"
            className="form-label visually-hidden"
         >
            Email address
         </label>

         <input
            type="email"
            className="form-control"
            id="formSigninEmail"
            placeholder="Email"
            value={email}
            onChange={(e) =>
               setEmail(e.target.value)
            }
            required
         />

      </div>

      {/* PASSWORD */}
      <div className="col-12">

         <div className="password-field position-relative">

            <label
               htmlFor="formSigninPassword"
               className="form-label visually-hidden"
            >
               Password
            </label>

            <input
               type="password"
               className="form-control"
               id="formSigninPassword"
               placeholder="*****"
               value={password}
               onChange={(e) =>
                  setPassword(e.target.value)
               }
               required
            />

         </div>

      </div>

      {/* REMEMBER */}
      <div className="d-flex justify-content-between">

         <div className="form-check">

            <input
               className="form-check-input"
               type="checkbox"
               id="flexCheckDefault"
            />

            <label
               className="form-check-label"
               htmlFor="flexCheckDefault"
            >
               Remember me
            </label>

         </div>

      </div>

      {/* BUTTON */}
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
                  </div>
               </div>
            </div>
         </section>
        </>
    )
}
export default Signin