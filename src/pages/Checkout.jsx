import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Navigate } from "react-router-dom";
import { getUserAddress } from "../services/userAddress";
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/placeOrder'
const Checkout = () => {
   const token = localStorage.getItem("token");
   const [address, setAddress] = useState([]);
   const [selectedAddress, setSelectedAddress] = useState(null);
   const { cartItems, setCartItems, cartCount, setCartCount,summary,setSummary } = useCart();

   const [paymentMethod, setPaymentMethod] = useState("COD");
   const [orderNote, setOrderNote] = useState("");

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
      getAddress()
   }, [])

   if (!token) {
      return <Navigate to="/Signin" replace />;
   }

   const handlePlaceOrder = async () => {

   if (!selectedAddress) {
      alert("Please select an address");
      return;
   }

   const selected = address.find(
      item => item.id === selectedAddress
   );

   if (!selected) {
      alert("Address not found");
      return;
   }

   const payload = {
      shipping_name: `${selected.f_name} ${selected.l_name}`,
      shipping_phone: selected.phone || "",
      shipping_email: "",
      shipping_address: `${selected.address_a} ${selected.address_b || ""}`,
      shipping_city: selected.city,
      shipping_state: selected.state,
      shipping_postal_code: selected.pincode,
      shipping_country: "India",
      order_note: orderNote,
      coupon_code: "",
      payment_method: paymentMethod
   };

   try {

      const res = await placeOrder(payload);

      if (res.status) {

         alert("Order placed successfully");

         console.log(res.data);

         // navigate("/thank-you");
      }

   } catch (error) {
      console.log(error);
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

                                                   {item.city}, {item.state} - {item.pincode}<br/>
                                                   {item.mobile}
                                                </address>

                                                {item.default_address === "Y" && (
                                                   <span className="text-danger">
                                                      Default Address
                                                   </span>
                                                )}

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
                                    <label for="DeliveryInstructions" className="form-label sr-only">Delivery instructions</label>
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
                                                   <label className="form-check-label ms-2" for="paypal"></label>
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
                                                   <label className="form-check-label ms-2" for="creditdebitcard"></label>
                                                </div>
                                                <div>
                                                   <h5 className="mb-1 h6">Credit / Debit Card</h5>
                                                   <p className="mb-0 small">Safe money transfer using your bank accou k account. We support Mastercard tercard, Visa, Discover and Stripe.</p>
                                                </div>
                                             </div>
                                             <div className="row g-2">
                                                <div className="col-12">
                                                 
                                                   <div className="mb-3">
                                                      <label for="card-mask" className="form-label">Card Number</label>
                                                      <input type="text" className="form-control" id="card-mask" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                                                   </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0">
                                                      <label className="form-label" for="nameoncard">Name on card</label>
                                                      <input type="text" className="form-control" placeholder="Enter name" id="nameoncard" />
                                                   </div>
                                                </div>
                                                <div className="col-md-3 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0 position-relative">
                                                      <label className="form-label" for="expirydate">Expiry date</label>
                                                      <input type="text" className="form-control" id="expirydate" placeholder="MM/YY" />
                                                   </div>
                                                </div>
                                                <div className="col-md-3 col-12">
                                                 
                                                   <div className="mb-3 mb-lg-0">
                                                      <label for="digit-mask" className="form-label">
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
                                                   <label className="form-check-label ms-2" for="payoneer"></label>
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
                                                         id="cashonDelivery"
                                                         checked={paymentMethod === "COD"}
                                                         onChange={() => setPaymentMethod("COD")}
                                                      />
                                                   <label className="form-check-label ms-2" for="cashonDelivery"></label>
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
         <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
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
                        {/* col */}
                        <div className="col-6">
                           <input type="text" className="form-control" placeholder="First name" aria-label="First name" required="" />
                        </div>
                        {/* col */}
                        <div className="col-6">
                           <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" required="" />
                        </div>
                        {/* col */}
                        <div className="col-12">
                           <input type="text" className="form-control" placeholder="Address Line 1" />
                        </div>
                        <div className="col-12">
                           {/* button */}
                           <input type="text" className="form-control" placeholder="Address Line 2" />
                        </div>
                        <div className="col-6">
                           {/* button */}
                           <input type="text" className="form-control" placeholder="City" />
                        </div>

                        <div className="col-6">
                           {/* button */}
                           <select className="form-select">
                              <option selected="">West Bengal</option>
                              <option value="1">Assam</option>
                              <option value="2">Tripura</option>
                              <option value="3">Manipur</option>
                           </select>
                        </div>
                        <div className="col-6">
                           {/* button */}
                           <input type="text" className="form-control" placeholder="Pin Code" />
                        </div>
                        <div className="col-6">
                           {/* button */}
                           <select className="form-select">
                              <option selected="">Address Type</option>
                              <option value="home">Home</option>
                              <option value="work">Office / Work</option>

                           </select>
                        </div>
                         <div className="col-12">
                                 <input type="text" className="form-control" placeholder="Mobile" />
                         </div>
                        <div className="col-12">
                           {/* button */}
                           <input type="text" className="form-control" placeholder="Business Name" />
                        </div>
                        <div className="col-12">
                           <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                              {/* label */}
                              <label className="form-check-label" for="flexCheckDefault">Set as Default</label>
                           </div>
                        </div>
                        {/* button */}
                        <div className="col-12 text-end">
                           <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
                           <button className="btn btn-primary" type="button">Save Address</button>
                        </div>
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