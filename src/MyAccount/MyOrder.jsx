import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { orderHistory } from "../services/user";
import { useNavigate,NavLink } from "react-router-dom";

const MyOrder = ()=>{
   const navigate = useNavigate();
   const [orderData,setOrderData] = useState([]);
   const getOrderHistory = async ()=>{
      try {
         const res = await orderHistory()
         if(res.status)
         {
            setOrderData(res.data.orders);
            console.log(res.data.orders)
         }
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(()=>{

       const token = localStorage.getItem("token");
      // LOGIN NA THAKLE
      if (!token) {

         navigate("/Signin");

         return;

      }
      getOrderHistory()
   },[])

    return(
        <>
        <Header/>
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
                       {/* heading */}
                        <h2 className="mb-6">Your Orders</h2>

                        <div className="table-responsive-xxl border-0">
                          {/* Table */}
                           <table className="table mb-0 text-nowrap table-centered table-bordered">
                             {/* Table Head */}
                              <thead className="bg-light">
                                 <tr>
                                    <th>&nbsp;</th>
                                    <th>Product</th>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                    <th>Amount</th>

                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {orderData.map((order) => {

                                    const firstItem = order.items?.[0];

                                    return (
                                       <tr key={order.id}>
                                          <td className="align-middle border-top-0 w-0">
                                             <a href="#">
                                                <img style={{"width":"40px","height":"40px","borderRadius":"50%"}}
                                                   src={firstItem?.thumbnail}
                                                   alt={firstItem?.product_name}
                                                   className="icon-shape icon-xl"
                                                />
                                             </a>
                                          </td>

                                          <td className="align-middle border-top-0">
                                             <a href="#" className="fw-semibold text-inherit">
                                                <h6 className="mb-0">
                                                   {firstItem?.product_name}
                                                </h6>
                                             </a>

                                             {order.items.length > 1 && (
                                                <small className="text-muted">
                                                   +{order.items.length - 1} more item(s)
                                                </small>
                                             )}
                                          </td>

                                          <td className="align-middle border-top-0">
                                             <span className="text-inherit">
                                                #{order.order_number}
                                             </span>
                                          </td>

                                          <td className="align-middle border-top-0">
                                             {new Date(order.created_at).toLocaleDateString()}
                                          </td>

                                          <td className="align-middle border-top-0">
                                             {order.items.length}
                                          </td>

                                          <td className="align-middle border-top-0">
                                             <span
                                                className={`badge ${
                                                   order.order_status === "delivered"
                                                      ? "bg-success"
                                                      : order.order_status === "cancelled"
                                                      ? "bg-danger"
                                                      : "bg-warning"
                                                }`}
                                             >
                                                {order.order_status}
                                             </span>
                                          </td>

                                          <td className="align-middle border-top-0">
                                             ₹{order.total_amount}
                                          </td>

                                          <td className="text-muted align-middle border-top-0">
                                             <button onClick={()=>
                                          
                                             navigate(`/orderDetails/${order.id}`)}
                                                className="btn btn-sm btn-outline-primary"
                                             >
                                                View
                                             </button>
                                          </td>
                                       </tr>
                                    );
                                 })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer/>
        </>
    )
}
export default MyOrder