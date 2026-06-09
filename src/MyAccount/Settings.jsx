import { NavLink, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { changePassword, editUser } from "../services/user";
const Settings = () => {
   const navigate = useNavigate()
   const [profileForm, setProfileForm] = useState({name: "",email: "",phone: ""});
   const [loginForm,setloginForm] = useState({newPassword:"",cnfPassword:""})

   const handleLogin = (e)=>{
      const { name, value} = e.target;
      setloginForm((prev)=>({
         ...prev,
         [name]:value
      }))
   }
useEffect(()=>{
    const token = localStorage.getItem("token");
      // LOGIN NA THAKLE
      if (!token) {

         navigate("/Signin");

         return;

      }
})
const passwordChange = async (e) => {
   e.preventDefault();

   const { newPassword, cnfPassword } = loginForm;

   if (!newPassword || !cnfPassword) {
      Swal.fire({
         icon: "warning",
         title: "Required",
         text: "Please fill all fields"
      });
      return;
   }

   if (newPassword !== cnfPassword) {
      Swal.fire({
         icon: "error",
         title: "Password Mismatch",
         text: "New password and confirm password do not match"
      });
      return;
   }
   let res;
   try {

      const payload = {
         new_password: newPassword,
         confirm_password: cnfPassword
      };

      res = await changePassword(payload);

      if (res.status) {

         setloginForm({
            newPassword: "",
            cnfPassword: ""
         });

         Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message
         });
      }

   } catch (error) {

      Swal.fire({
         icon: "error",
         title: "Error",
         text:
            res?.message ||
         error?.response?.data?.message ||
         "Something went wrong"
      });

      console.log(error);
   }
};
   /* ================= HANDLE CHANGE ================= */

   const handleChange = (e) => {

      const { name, value } = e.target

      setProfileForm((prev) => ({
         ...prev,
         [name]: value
      }))

   }

   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const payload = {
            name: profileForm.name,
            email: profileForm.email,
            phone: profileForm.phone
         };
         const res = await editUser(payload);

         if (res.status) {

            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            // Clear form
            setProfileForm({ name: "", email: "", phone: "" });
            Swal.fire({
               icon: "success",
               title: "Success",
               text: res.message
            });
         }

      } catch (error) {
         console.log(error);
         
      }
   };


const logout = () => {

   // REMOVE STORAGE
   localStorage.removeItem("token");
   localStorage.removeItem("user");

   // OPTIONAL
   localStorage.removeItem("guest_cart");

 

   // REDIRECT
   navigate("/");

};

   return (<>
      <Header />
      <main>

         <section>

            <div className="container">

               <div className="row">

                  <div className="col-12">
                     <div className="d-flex justify-content-between align-items-center d-md-none py-4">

                        <h3 className="fs-5 mb-0">Account Setting</h3>

                        <button
                           className="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3"
                           type="button"
                           data-bs-toggle="offcanvas"
                           data-bs-target="#offcanvasAccount"
                           aria-controls="offcanvasAccount">
                           <i className="bi bi-text-indent-left fs-3"></i>
                        </button>
                     </div>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                     <div className="pt-10 pe-lg-10">
                        <ul className="nav flex-column nav-pills nav-pills-dark">

                           <li className="nav-item">
                              <NavLink
                                 to="/MyOrder"
                                 className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                 }
                              >
                                 <i className="feather-icon icon-shopping-bag me-2"></i>
                                 Your Orders
                              </NavLink>
                           </li>

                           <li className="nav-item">
                              <NavLink
                                 to="/Settings"
                                 className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                 }
                              >
                                 <i className="feather-icon icon-settings me-2"></i>
                                 Settings
                              </NavLink>
                           </li>

                           <li className="nav-item">
                              <NavLink
                                 to="/MyAddress"
                                 className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                 }
                              >
                                 <i className="feather-icon icon-map-pin me-2"></i>
                                 Address
                              </NavLink>
                           </li>

                           <li className="nav-item">
                              <hr />
                           </li>

                           <li className="nav-item">
                              <NavLink onClick={logout}
                                
                                 className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                 }
                              >
                                 <i className="feather-icon icon-log-out me-2"></i>
                                 Log out
                              </NavLink>
                           </li>

                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-12">
                     <div className="py-6 p-md-6 p-lg-10">
                        <div className="mb-6">

                           <h2 className="mb-0">Account Setting</h2>
                        </div>
                        <div>


                           <div className="row">
                              <div className="col-lg-6">
                                 <h5 className="mb-4">Account details</h5>
                                 <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                       <label className="form-label">Name</label>
                                       <input type="text" value={profileForm.name} onChange={handleChange} name="name" className="form-control" placeholder="jitu chauhan" />
                                    </div>

                                    <div className="mb-3">
                                       <label className="form-label">Email</label>
                                       <input type="email" value={profileForm.email} onChange={handleChange} name="email" className="form-control" placeholder="example@gmail.com" />
                                    </div>

                                    <div className="mb-5">
                                       <label className="form-label">Phone</label>
                                       <input type="text" value={profileForm.phone} onChange={handleChange} name="phone" className="form-control" placeholder="Phone number" />
                                    </div>

                                    <div className="mb-3">
                                       <button className="btn btn-primary" type="submit">Save Details</button>
                                    </div>
                                 </form>
                              </div>
                              <div className="col-lg-6">
                                 <h5 className="mb-4">Change Password</h5>

 
                                 <form className="row" onSubmit={passwordChange}>

                                    <div className="mb-3 col-12">
                                       <label className="form-label">New Password</label>
                                       <input type="password" onChange={handleLogin} name="newPassword" className="form-control" placeholder="**********" />
                                    </div>

                                    <div className="mb-3 col-12">
                                       <label className="form-label">Current Password</label>
                                       <input type="password" onChange={handleLogin} name="cnfPassword" className="form-control" placeholder="**********" />
                                    </div>

                                    <div className="col-12">
                                       <p className="mb-4">
                                          Can’t remember your current password?
                                          <a href="#">Reset your password.</a>
                                       </p>
                                       <button type="submit" className="btn btn-primary">Save Password</button>
                                    </div>
                                 </form>

                              </div>
                           </div>
                        </div>
                        <hr className="my-10" />


                        <div>

                           <h5 className="mb-4">Delete Account</h5>
                           <p className="mb-2">Would you like to delete your account?</p>
                           <p className="mb-5">This account contain 12 orders, Deleting your account will remove all the order details associated with it.</p>

                           <a href="#" className="btn btn-outline-danger">I want to delete my account</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
      <Footer />
   </>)
}
export default Settings