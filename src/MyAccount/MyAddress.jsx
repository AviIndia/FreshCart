import { NavLink, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useState, useEffect } from "react";
import { getUserAddress } from "../services/userAddress";
import { addAddress, deleteAddress, setDefaultAddress } from "../services/user";
import Swal from "sweetalert2";
const MyAddress = () => {
   const navigate = useNavigate();
   const [address, setAddress] = useState([]);
   const [selectedAddress, setSelectedAddress] = useState(null);
   
   const getAddress = async () => {
      try {
         const res = await getUserAddress();

         if (res.status) {

            const addresses = res.data.addresses;

            setAddress(addresses);

            const defaultAddr = addresses.find(
               item => item.default_address === "Y"
            );

            if (defaultAddr) {
               setSelectedAddress(defaultAddr.id);
            }
         }

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {

       const token = localStorage.getItem("token");
      // LOGIN NA THAKLE
      if (!token) {

         navigate("/Signin");

         return;

      }

      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
      getAddress();
   }, []);


   /* =============== handle set default =============== */
   const handleSetDefault = async (id) => {

   const result = await Swal.fire({
      title: "Set Default Address?",
      text: "This address will become your default address.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
   });

   if (!result.isConfirmed) return;

   try {

      const res = await setDefaultAddress(id);

      if (res.status) {

         Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message
         });

         getAddress();
      }

   } catch (error) {
     console.log("FULL ERROR:", error);

   Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.message || "Something went wrong"
   });
   }
};

/* ===================== delete address============= */
 const handleDelete = async (id) => {
   console.log("Address Id",id)
   const result = await Swal.fire({
      title: "Delete Address?",
      text: "This address will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel"
   });

   if (!result.isConfirmed) return;

   try {

      const res = await deleteAddress(id);

      if (res.status) {

         Swal.fire({
            icon: "success",
            title: "Deleted",
            text: res.message
         });

         getAddress();
      }

   } catch (error) {

   console.log("Full Error:", error);

   console.log("Response:", error.response?.data);

}
}; 
const [addressForm,setAddressForm] = useState({
   f_name:"",
   l_name:"",
   address_a:"",
   address_b:"",
   city:"",
   state:"",
   pincode:"", 
   address_type:"",
   mobile:"",
   buisiness_name:"",
   default_address:"N"
})

const handleAddressChange = (e) => {

   const { name, value, type, checked } = e.target;

   setAddressForm((prev) => ({
      ...prev,
      [name]:
         type === "checkbox"
            ? (checked ? "Y" : "N")
            : value
   }));
};

const submitAddress = async (e) => {

   e.preventDefault();

   try {

      const res = await addAddress(addressForm);

      if (res.status) {

         Swal.fire({
            icon: "success",
            title: "Success",
            text: res.message
         });

         setAddressForm({
            f_name: "",
            l_name: "",
            address_a: "",
            address_b: "",
            city: "",
            state: "",
            pincode: "",
            address_type: "",
            mobile: "",
            buisiness_name: "",
            default_address: "N"
         });

         getAddress();

      }

   } catch (error) {

      let errorMessage = "Something went wrong";

      if (error.errors) {
         errorMessage = Object.values(error.errors).join("\n");
      }

      Swal.fire({
         icon: "error",
         title: "Error",
         text: errorMessage
      });

      console.log(error);

       if (error.response) {
      console.log("API Response:", error.response.data);
   }
   }
};

/* ======================= ADD NEW ADDRESS================== */
return (
      <>
         <Header />

         <section>
            {/* container */}
            <div className="container">
               {/* row */}
               <div className="row">
                  {/* col */}
                  <div className="col-12">
                     <div className="d-flex justify-content-between align-items-center d-md-none py-4">
                        {/* heading */}
                        <h3 className="fs-5 mb-0">Account Setting</h3>
                        {/* button */}
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
                  {/* col */}
                  <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                     <div className="pt-10 pe-lg-10">
                        {/* nav */}
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
                              <NavLink
                                 to="/Signin"
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
                        <div className="d-flex justify-content-between mb-6">
                           {/* heading */}
                           <h2 className="mb-0">Address</h2>
                           {/* button */}
                           <a href="#" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addAddressModal">Add a new address</a>
                        </div>
                        <div className="row">
                           {address?.map((item) => (
                              <div
                                 className="col-xl-6 col-lg-12 col-md-6 col-12 mb-4"
                                 key={item.id}
                              >
                                 <div className="card card-body p-6">

                                    <div className="form-check mb-4">
                                       <input
                                          className="form-check-input"
                                          type="radio"
                                          name="shippingAddress"
                                          id={`address_${item.id}`}
                                          value={item.id}
                                          checked={selectedAddress === item.id}
                                          onChange={() => setSelectedAddress(item.id)}
                                       />

                                       <label
                                          className="form-check-label text-dark"
                                          htmlFor={`address_${item.id}`}
                                       >
                                          {item.address_type}
                                       </label>
                                    </div>

                                    <address>
                                       <strong>
                                          {item.f_name} {item.l_name}
                                       </strong>
                                       <br />

                                       {item.address_a}

                                       {item.address_b && (
                                          <>
                                             <br />
                                             {item.address_b}
                                          </>
                                       )}

                                       <br />

                                       {item.city}, {item.state} - {item.pincode}<br />
                                       {item.mobile}
                                    </address>

                                    {item.default_address === "1" && (
                                       <span className="text-danger">
                                          Default Address
                                       </span>
                                    )}





                                   <div className="mt-2">

                                       {item.default_address !== "1" && (
                                          <button
                                             className="btn btn-link p-0 text-primary"
                                             onClick={() => handleSetDefault(item.id)}
                                          >
                                             Set as Default Address
                                          </button>
                                       )}

                                       <button
                                          className="btn btn-link text-danger ms-3 p-0"
                                          onClick={() => handleDelete(item.id)}
                                       >
                                          Delete
                                       </button>

                                    </div>

                                 </div>


                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
             {/* Modal */}
         <div className="modal fade" id="addAddressModal" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  {/* modal body */}
                  <div className="modal-body p-6">
                     <div className="d-flex justify-content-between mb-5">
                        {/* heading */}
                        <div>
                           <h5 className="h6 mb-1" id="addAddressModalLabel">New Shipping Address</h5>
                           <p className="small mb-0">Add new shipping address for your order delivery.</p>
                        </div>
                        <div>
                           {/* button */}
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                     </div>
                     {/* row */}
                     <div className="row g-3">
                       <form onSubmit={submitAddress}>
                           <div className="row g-3">

                              <div className="col-6">
                                 <input
                                    type="text"
                                    name="f_name"
                                    value={addressForm.f_name}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="First Name"
                                 />
                              </div>

                              <div className="col-6">
                                 <input
                                    type="text"
                                    name="l_name"
                                    value={addressForm.l_name}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Last Name"
                                 />
                              </div>

                              <div className="col-12">
                                 <input
                                    type="text"
                                    name="address_a"
                                    value={addressForm.address_a}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Address Line 1"
                                 />
                              </div>

                              <div className="col-12">
                                 <input
                                    type="text"
                                    name="address_b"
                                    value={addressForm.address_b}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Address Line 2"
                                 />
                              </div>

                              <div className="col-6">
                                 <input
                                    type="text"
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="City"
                                 />
                              </div>

                              <div className="col-6">
                                 <select
                                    name="state"
                                    value={addressForm.state}
                                    onChange={handleAddressChange}
                                    className="form-select"
                                 >
                                    <option value="">Select State</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Manipur">Manipur</option>
                                 </select>
                              </div>

                              <div className="col-6">
                                 <input
                                    type="text"
                                    name="pincode"
                                    value={addressForm.pincode}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Pin Code"
                                 />
                              </div>

                              <div className="col-6">
                                 <select
                                    name="address_type"
                                    value={addressForm.address_type}
                                    onChange={handleAddressChange}
                                    className="form-select"
                                 >
                                    <option value="">Address Type</option>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office / Work</option>
                                 </select>
                              </div>

                              <div className="col-12">
                                 <input
                                    type="text"
                                    name="mobile"
                                    value={addressForm.mobile}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Mobile"
                                 />
                              </div>

                              <div className="col-12">
                                 <input
                                    type="text"
                                    name="buisiness_name"
                                    value={addressForm.buisiness_name}
                                    onChange={handleAddressChange}
                                    className="form-control"
                                    placeholder="Business Name"
                                 />
                              </div>

                              <div className="col-12">
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="checkbox"
                                       name="default_address"
                                       checked={addressForm.default_address === "Y"}
                                       onChange={handleAddressChange}
                                       id="flexCheckDefault"
                                    />

                                    <label
                                       className="form-check-label"
                                       htmlFor="flexCheckDefault"
                                    >
                                       Set as Default Address
                                    </label>
                                 </div>
                              </div>

                              <div className="col-12 text-end">
                                 <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    data-bs-dismiss="modal"
                                 >
                                    Cancel
                                 </button>

                                 <button
                                    type="submit"
                                    className="btn btn-primary ms-2"
                                 >
                                    Save Address
                                 </button>
                              </div>

                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}
export default MyAddress