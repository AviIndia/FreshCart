import { useEffect,useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Navigate, useNavigate } from "react-router-dom";
import { getUserAddress } from "../services/userAddress";
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/placeOrder'
import Swal from "sweetalert2";
import { addAddress, deleteAddress, setDefaultAddress } from "../services/user";
const Checkout = () => {

   const token = localStorage.getItem("token");
   const navigate = useNavigate();
   const [address, setAddress] = useState([]);
   const [selectedAddress, setSelectedAddress] = useState(null);

   const { cartItems, setCartItems, setCartCount, summary } = useCart();

   const [paymentMethod, setPaymentMethod] = useState("COD");
   const [orderNote, setOrderNote] = useState("");
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
      getAddress();
       window.scrollTo({
      top: 0,
      behavior: "smooth"
   });
      
   }, []);

   if (!token) {
      return <Navigate to="/Signin" replace />;
   }

   const handlePlaceOrder = async () => {

      if (!selectedAddress) {
               Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select an address",
            });
         return;
      }

      const payload = {
         shipping_id: selectedAddress,
         order_note: orderNote,
         coupon_code: "",
         payment_method: paymentMethod
      };


      // Loading popup
        Swal.fire({
          title: "Please wait...",
          text: "Processing your order",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

      try {

         const res = await placeOrder(payload);
         

         

// Loading close
    Swal.close();
         if (res.status) {

            Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order placed successfully",
            });
            setCartItems([]);
            setCartCount(0);
            
            /* console.log(res.data);

            console.log("FULL RESPONSE:", res);
   console.log("DATA:", res.data); */
            navigate("/Thankyou")
         }

      } catch (error) {
          /* console.log("ERROR:", error);
   console.log("ERROR RESPONSE:", error.response);
         console.error(error); */
          // Loading close
             Swal.close();
         if (error.response?.data?.message) {
            
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            });
         } else {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
            });
         }
      }
   };


/* ====================== ADDRESS================= */
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

   return (

      <div>
         <Header />
         <div className="mt-4">
            <div className="container">
               {/* row */}
               <div className="row">
                  {/* col */}
                  <div className="col-12">
                     {/* breadcrumb */}
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                           <li className="breadcrumb-item"><a href="#!">Home</a></li>
                           <li className="breadcrumb-item"><a href="#!">Shop</a></li>
                           <li className="breadcrumb-item active" aria-current="page">Shop Checkout</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         {/* section */}
         <section className="mb-lg-14 mb-8 mt-8">
            <div className="container">
               {/* row */}
               <div className="row">
                  {/* col */}
                  <div className="col-12">
                     <div>
                        <div className="mb-8">
                           {/* text */}
                           <h1 className="fw-bold mb-0">Checkout</h1>
                           {/* <p className="mb-0">
                              Already have an account? Click here to
                              <a href="#!">Sign in</a>
                              .
                           </p> */}
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  {/* row */}
                  <div className="row">
                     <div className="col-xl-7 col-lg-6 col-md-12">
                        {/* accordion */}
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                           {/* accordion item */}
                           <div className="accordion-item py-4">
                              <div className="d-flex justify-content-between align-items-center">

                                 <a
                                    href="#"
                                    className="fs-5 text-inherit collapsed h4"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="true"
                                    aria-controls="flush-collapseOne">
                                    <i className="feather-icon icon-map-pin me-2 text-muted"></i>
                                    Add delivery address
                                 </a>

                                 <a href="#" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addAddressModal">Add a new address</a>

                              </div>
                              <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                 <div className="mt-5">
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

                           {/* accordion item */}
                           <div className="accordion-item py-4">
                              <a href="#" className="text-inherit h5" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                 <i className="feather-icon icon-shopping-bag me-2 text-muted"></i>
                                 Delivery Note
                                 {/* collapse */}
                              </a>
                              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                 <div className="mt-5">
                                    <label  className="form-label sr-only">Delivery instructions</label>
                                    <textarea
                                       className="form-control"
                                       id="DeliveryInstructions"
                                       rows="3"
                                       value={orderNote}
                                       onChange={(e) => setOrderNote(e.target.value)}
                                       placeholder="Write delivery instructions"
                                    />
                                    <p className="form-text">Add instructions for how you want your order shopped and/or delivered</p>
                                    <div className="mt-5 d-flex justify-content-end">
                                       <a
                                          href="#"
                                          className="btn btn-outline-gray-400 text-muted"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#flush-collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="flush-collapseTwo">
                                          Prev
                                       </a>
                                       <a href="#" className="btn btn-primary ms-2" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                          Next
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* accordion item */}
                           <div className="accordion-item py-4">
                              <a href="#" className="text-inherit h5" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                 <i className="feather-icon icon-credit-card me-2 text-muted"></i>
                                 Payment Method

                              </a>
                              <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                 <div className="mt-5">
                                    <div>
                                       {/*  <div className="card card-bordered shadow-none mb-2">
                                         
                                          <div className="card-body p-6">
                                             <div className="d-flex">
                                                <div className="form-check">
                                                   
                                                   <input className="form-check-input" type="radio" name="flexRadioDefault" id="paypal" />
                                                   <label className="form-check-label ms-2"></label>
                                                </div>
                                                <div>
                                                  
                                                   <h5 className="mb-1 h6">Payment with Paypal</h5>
                                                   <p className="mb-0 small">You will be redirected to PayPal website to complete your purchase securely.</p>
                                                </div>
                                             </div>
                                          </div>
                                       </div> */}

                                       {/* <div className="card card-bordered shadow-none mb-2">
                                        
                                          <div className="card-body p-6">
                                             <div className="d-flex mb-4">
                                                <div className="form-check">
                                                  
                                                   <input className="form-check-input" type="radio" name="flexRadioDefault" id="creditdebitcard" />
                                                   <label className="form-check-label ms-2" ></label>
                                                </div>
                                                <div>
                                                   <h5 className="mb-1 h6">Credit / Debit Card</h5>
                                                   <p className="mb-0 small">Safe money transfer using your bank accou k account. We support Mastercard tercard, Visa, Discover and Stripe.</p>
                                                </div>
                                             </div>
                                             <div className="row g-2">
                                                <div className="col-12">
                                                 
                                                   <div className="mb-3">
                                                      <label  className="form-label">Card Number</label>
                                                      <input type="text" className="form-control" id="card-mask" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                                                   </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0">
                                                      <label className="form-label" >Name on card</label>
                                                      <input type="text" className="form-control" placeholder="Enter name" id="nameoncard" />
                                                   </div>
                                                </div>
                                                <div className="col-md-3 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0 position-relative">
                                                      <label className="form-label" >Expiry date</label>
                                                      <input type="text" className="form-control" id="expirydate" placeholder="MM/YY" />
                                                   </div>
                                                </div>
                                                <div className="col-md-3 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0">
                                                      <label  className="form-label">
                                                         CVV Code
                                                         <i
                                                            className="fe fe-help-circle ms-1"
                                                            data-bs-toggle="tooltip"
                                                            data-placement="top"
                                                            title="A 3 - digit number, typically printed on the back of a card."></i>
                                                      </label>
                                                      <input type="password" className="form-control" name="digit-mask" id="digit-mask" placeholder="xxx" maxlength="3" inputmode="numeric" required />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div> */}
                                       {/* card */}
                                       {/*  <div className="card card-bordered shadow-none mb-2">
                                         
                                          <div className="card-body p-6">
                                          
                                             <div className="d-flex">
                                                <div className="form-check">
                                                   <input className="form-check-input" type="radio" name="flexRadioDefault" id="payoneer" />
                                                   <label className="form-check-label ms-2" ></label>
                                                </div>
                                                <div>
                                                  
                                                   <h5 className="mb-1 h6">Pay with Payoneer</h5>
                                                   <p className="mb-0 small">You will be redirected to Payoneer website to complete your purchase securely.</p>
                                                </div>
                                             </div>
                                          </div>
                                       </div> */}
                                       {/* card */}
                                       <div className="card card-bordered shadow-none">
                                          <div className="card-body p-6">

                                             <div className="d-flex">
                                                <div className="form-check">
                                                  <input
                                                      className="form-check-input"
                                                      type="radio"
                                                      name="paymentMethod"
                                                      value="COD"
                                                      checked={paymentMethod === "COD"}
                                                      onChange={(e) => setPaymentMethod(e.target.value)}
                                                   />
                                                   <label className="form-check-label ms-2" ></label>
                                                </div>
                                                <div>

                                                   <h5 className="mb-1 h6">Cash on Delivery</h5>
                                                   <p className="mb-0 small">Pay with cash when your order is delivered.</p>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       {/* Button */}
                                       <div className="mt-5 d-flex justify-content-end">
                                          <a
                                             href="#"
                                             className="btn btn-outline-gray-400 text-muted"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#flush-collapseThree"
                                             aria-expanded="false"
                                             aria-controls="flush-collapseThree">
                                             Prev
                                          </a>
                                         <button
                                          type="button"
                                          className="btn btn-primary ms-2"
                                          onClick={handlePlaceOrder}
                                       >
                                          Place Order
                                       </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-md-12 offset-xl-1 col-xl-4 col-lg-6">
                        <div className="mt-4 mt-lg-0">
                           <div className="card shadow-sm">
                              <h5 className="px-6 py-4 bg-transparent mb-0">Order Details</h5>
                              <ul className="list-group list-group-flush">
                                {
                                 cartItems.map((item)=>(
                                     <li className="list-group-item px-4 py-3">
                                    <div className="row align-items-center">

                                       <div className="col-5 col-md-7">
                                          <h6 className="mb-0">{item.name}</h6>
                                          {/* <span><small className="text-muted">.98 / lb</small></span> */}
                                       </div>
                                       <div className="col-2 col-md-2 text-center text-muted">
                                          <span>{item.quantity}</span>
                                       </div>
                                       <div className="col-3 text-lg-end text-start text-md-end col-md-3">
                                          <span className="fw-bold">₹{item.final_price}</span>
                                       </div>
                                    </div>
                                 </li>
                                 ))
                                }
                           

                                 
              
                                 {/* list group item */}
                                 <li className="list-group-item px-4 py-3">
                                    <div className="d-flex align-items-center justify-content-between fw-bold">
                                       <div>Subtotal</div>
                                      <div>₹{summary.grand_total}</div>
                                      
                                    </div>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         {/* Modal */}
         <div className="modal fade" id="deleteModal"  aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="deleteModalLabel">Delete address</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <h6>Are you sure you want to delete this address?</h6>
                     <p className="mb-6">
                        Jitu Chauhan
                        <br />

                        4450 North Avenue Oakland,
                        <br />

                        Nebraska, United States,
                        <br />

                        402-776-1106
                     </p>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-outline-gray-400" data-bs-dismiss="modal">Cancel</button>
                     <button type="button" className="btn btn-danger">Delete</button>
                  </div>
               </div>
            </div>
         </div>

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
      </div>
   )
}
export default Checkout