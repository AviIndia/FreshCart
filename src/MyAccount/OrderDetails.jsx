import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { myorderDetails } from "../services/user";
import { useParams,NavLink, useNavigate } from "react-router-dom";

const OrderDetails = () => {
   const navigate = useNavigate()
   const [orderDetails, setOrderDetails] = useState(null);
   const [loading, setLoading] = useState(true);

   const { order_id } = useParams();

   const detailsOrder = async (order_id) => {
      try {
         const res = await myorderDetails(order_id);

         if (res.status) {
            setOrderDetails(res.data);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {

       const token = localStorage.getItem("token");
      // LOGIN NA THAKLE
      if (!token) {

         navigate("/Signin");

         return;

      }
      console.log(order_id);
      detailsOrder(order_id);
      /* if (order_id) {
        
      } */
   }, [order_id]);
   return (
      <>
         <Header />
         <section>
            <div className="container">
               {/*  */}
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
                     <div className="pt-5 pe-lg-5">
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
                     {loading ? (
                        <div className="text-center py-5">
                           <h5>Loading Order Details...</h5>
                        </div>
                     ) : orderDetails ? (
                        <>
                           {/* Order Summary */}
                           <div className="row">
                              
                           </div>
                           <div className="card shadow-sm mb-4 mt-5">
                              <div className="card-body">
                                 <h4 className="mb-3">Order Summary</h4>

                                 <div className="row">
                                    <div className="col-md-6">
                                       <p>
                                          <strong>Order Number:</strong><br />
                                          #{orderDetails.order.order_number}
                                       </p>

                                       <p>
                                          <strong>Order Date:</strong><br />
                                          {new Date(
                                             orderDetails.order.created_at
                                          ).toLocaleString()}
                                       </p>
                                    </div>

                                    <div className="col-md-6">
                                       <p>
                                          <strong>Payment Method:</strong><br />
                                          {orderDetails.order.payment_method}
                                       </p>

                                       <p>
                                          <strong>Status:</strong><br />

                                          <span className="badge bg-warning">
                                             {orderDetails.order.order_status}
                                          </span>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                                                   {/* Ordered Products */}
                           <div className="card shadow-sm mb-4">
                              <div className="card-body">

                                 <h4 className="mb-4">
                                    Ordered Products
                                 </h4>

                                 {orderDetails.items.map((item) => (
                                    <div
                                       key={item.id}
                                       className="d-flex align-items-center border-bottom pb-3 mb-3"
                                    >
                                       <img
                                          src={item.thumbnail}
                                          alt={item.product_name}
                                          style={{
                                             width: "80px",
                                             height: "80px",
                                             objectFit: "cover"
                                          }}
                                          className="rounded"
                                       />

                                       <div className="ms-3 flex-grow-1">
                                          <h6 className="mb-1">
                                             {item.product_name}
                                          </h6>

                                          <small className="text-muted">
                                             Brand: {item.brand}
                                          </small>

                                          <div>
                                             Qty: {item.quantity}
                                          </div>
                                       </div>

                                       <div className="text-end">
                                          <strong>
                                             ₹{item.total_price}
                                          </strong>
                                       </div>
                                    </div>
                                 ))}

                              </div>
                           </div>
                           {/* Shipping Address */}
                           <div className="card shadow-sm mb-4">
                              <div className="card-body">

                                 <h4 className="mb-3">
                                    Shipping Address
                                 </h4>

                                 <h6>
                                    {orderDetails.shipping_details.name}
                                 </h6>

                                 <p className="mb-1">
                                    {orderDetails.shipping_details.mobile}
                                 </p>

                                 <p className="mb-1">
                                    {orderDetails.shipping_details.address_a}
                                 </p>

                                 {orderDetails.shipping_details.address_b && (
                                    <p className="mb-1">
                                       {orderDetails.shipping_details.address_b}
                                    </p>
                                 )}

                                 <p>
                                    {orderDetails.shipping_details.city},{" "}
                                    {orderDetails.shipping_details.state} -{" "}
                                    {orderDetails.shipping_details.pincode}
                                 </p>

                              </div>
                           </div>

   

                           {/* Payment Summary */}
                           <div className="card shadow-sm mb-5">
                              <div className="card-body">

                                 <h4 className="mb-3">
                                    Payment Summary
                                 </h4>

                                 <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>
                                       ₹{orderDetails.payment_summary.subtotal}
                                    </span>
                                 </div>

                                 <div className="d-flex justify-content-between mb-2">
                                    <span>Discount</span>
                                    <span>
                                       ₹{orderDetails.payment_summary.discount_amount}
                                    </span>
                                 </div>

                                 <div className="d-flex justify-content-between mb-2">
                                    <span>Shipping Charge</span>
                                    <span>
                                       ₹{orderDetails.payment_summary.shipping_charge}
                                    </span>
                                 </div>

                                 <hr />

                                 <div className="d-flex justify-content-between">
                                    <strong>Total Amount</strong>

                                    <strong className="text-success">
                                       ₹{orderDetails.payment_summary.total_amount}
                                    </strong>
                                 </div>

                              </div>
                           </div>
                        </>
                     ) : (
                        <div className="alert alert-danger">
                           Order not found
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </>
   )
}
export default OrderDetails