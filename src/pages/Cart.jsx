import Footer from "../components/Footer"
import Header from "../components/Header"
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { CategoryContext } from '../context/CategoryContext';
import { getCartItems } from '../services/cart';
import { useCart } from '../context/CartContext';
import { updateCart } from "../services/cart";
import { updateGuestCartQty } from "../utils/cartHelper";
import { removeCartItem } from "../services/cart";
import { removeGuestCartItem } from "../utils/cartHelper";
const Cart = () => {

   const navigate = useNavigate();
   const { cartItems, setCartItems, cartCount, setCartCount } = useCart();
   const { categories } = useContext(CategoryContext);

   const loadCartCount = async () => {

   const token = localStorage.getItem("token");

   if (token) {

      try {

         const res = await getCartItems();

         if (res.status) {

            console.log(res.data.items.length)
             //setCartItems(res.data.items || []);
            setCartCount(res.data.items.length || 0);

         }

      } catch (error) {

         console.log(error);

      }

   } else {

      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

      setCartCount(guestCart.length);
      console.log(guestCart.length)

   }

}

     /* ============ LOAD CART ITEMS =============== */
const loadCartItems = async () => {

   const token = localStorage.getItem("token");

   if (token) {

      try {

         const res = await getCartItems();

         if (res.status) {

            setCartItems(res.data.items || []);
            setCartCount(res.data.items.length || 0);

         }

      } catch (error) {

         console.log(error);

      }

   } else {

      const guestCart =
         JSON.parse(localStorage.getItem("guest_cart")) || [];

      setCartItems(guestCart);
      setCartCount(guestCart.length);

   }

};




   useEffect(() => {

      loadCartCount(); loadCartItems();

   }, []);


     /* =================== CART QTY HANDLE ============== */
const handleQuantity = async (item, type) => {
console.log(item)
   const token = localStorage.getItem("token");

   // LOGIN USER
   if (token) {

      try {

         let qty =
            type === "increase"
               ? item.quantity + 1
               : item.quantity - 1;

         if (qty < 1) qty = 1;

         const payload = {
            cart_id: item.cart_id,
            quantity: qty
         };

         console.log(payload);

         const res = await updateCart(payload);

         console.log(res);

         if (res.status) {

            await loadCartItems();

         }

      } catch (error) {

         console.log(error);

      }

   }

   // GUEST USER
   else {

      const updatedCart =
         updateGuestCartQty(item.product_id, type);

      setCartItems(updatedCart);

      setCartCount(updatedCart.length);

   }

}

const handleRemoveCart = async (item) => {

   const token = localStorage.getItem("token");
   console.log("Item fetched ", item)
   // LOGIN USER
   if (token) {

      try {

         const payload = { cart_id: item.cart_id };
         console.log(payload)
         const res = await removeCartItem(payload);

         if (res.status) {

            await loadCartItems();

         }

      } catch (error) {

         console.log(error);

      }

   }

   // GUEST USER
   else {

      removeGuestCartItem(
         item.product_id
      );

      loadCartItems();

   }

};

   /* ================= CART SUMMARY ================= */

/* ================= CART SUMMARY ================= */

const itemSubtotal = cartItems.reduce(
   (total, item) =>
      total +
      (Number(item.final_price || item.price) *
         Number(item.quantity)),
   0
);

// DELIVERY FEE
let deliveryFee = 0;

if (cartItems.length > 0 && itemSubtotal < 200) {

   deliveryFee = 50;

}

const grandTotal = itemSubtotal + deliveryFee;

   const handleCheckout = () => {

      const token = localStorage.getItem("token");

      // LOGIN NA THAKLE
      if (!token) {

         navigate("/Signin");

         return;

      }

      // LOGIN THAKLE
      navigate("/checkout");

   };
   return (
      <>
         <Header />
         <main>
            {/*  section*/}
            <div className="mt-4">
               <div className="container">
                  {/*  row */}
                  <div className="row">
                     {/*  col */}
                     <div className="col-12">
                        {/*  breadcrumb */}
                        <nav aria-label="breadcrumb">
                           <ol className="breadcrumb mb-0">
                              <li className="breadcrumb-item"><a href="#!">Home</a></li>
                              <li className="breadcrumb-item"><a href="#!">Shop</a></li>
                              <li className="breadcrumb-item active" aria-current="page">Shop Cart</li>
                           </ol>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
            {/*  section */}
            <section className="mb-lg-14 mb-8 mt-8">
               <div className="container">
                  {/*  row */}
                  <div className="row">
                     <div className="col-12">
                        {/*  card */}
                        <div className="card py-1 border-0 mb-8">
                           <div>
                              <h1 className="fw-bold">Shop Cart</h1>
                              <p className="mb-0">Shopping in 382480</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/*  row */}
                  <div className="row">
                     <div className="col-lg-8 col-md-7">
                        <div className="py-3">
                           {/*  alert */}
                           <div className="alert alert-danger p-2" role="alert">
                              You’ve got FREE delivery. Start
                              <a href="#!" className="alert-link">checkout now!</a>
                           </div>
                           <ul className="list-group list-group-flush">

                              {Array.isArray(cartItems) &&
                                 cartItems.map((item, index) => (

                                    <li
                                       className="list-group-item py-3 ps-0 border-top"
                                       key={index}
                                    >

                                       <div className="row align-items-center">

                                          <div className="col-6 col-md-6 col-lg-7">

                                             <div className="d-flex">

                                                <img
                                                   src={item.thumbnail}
                                                   alt={item.name}
                                                   className="icon-shape icon-xxl"
                                                />

                                                <div className="ms-3">

                                                   <a
                                                      href="#!"
                                                      className="text-inherit"
                                                   >
                                                      <h6 className="mb-0">
                                                         {item.name}
                                                      </h6>
                                                   </a>

                                                   <span>
                                                      <small className="text-muted">
                                                         Qty: {item.qty}
                                                      </small>
                                                   </span>

                                                   <div className="mt-2 small lh-1">

                                                      <button
                                                         type="button"
                                                         className="btn btn-link text-decoration-none text-inherit p-0 border-0"
                                                          onClick={() =>handleRemoveCart(item)}
                                                      >

                                                         <span className="text-muted">
                                                            Remove
                                                         </span>

                                                      </button>

                                                   </div>

                                                </div>

                                             </div>

                                          </div>

                                          <div className="col-4 col-md-3 col-lg-3">

                                             <div className="input-group input-spinner">

                                                <input type="button"
                                                   value="-"
                                                   className="button-minus btn btn-sm"
                                                  onClick={() => handleQuantity(item, "decrease")}
                                                />

                                                <input
                                                   type="number"
                                                   step="1"
                                                   value={item.quantity}
                                                   readOnly
                                                   className="quantity-field form-control-sm form-input"
                                                />

                                                <input
                                                   type="button"
                                                   value="+"
                                                   className="button-plus btn btn-sm"
                                                  onClick={() => handleQuantity(item, "increase")
                                             }
                                                />

                                             </div>

                                          </div>

                                          <div className="col-2 text-lg-end text-start text-md-end col-md-2">

                                             <span className="fw-bold">
                                                Rs.{item.price * item.quantity}
                                             </span>

                                          </div>

                                       </div>

                                    </li>

                                 ))


                              }

                              {Array.isArray(cartItems) &&
                                 cartItems.length === 0 && (

                                    <div className="text-center py-5">

                                       <h6>
                                          Cart is empty
                                       </h6>

                                    </div>

                                 )
                              }

                           </ul>
                           {/*  btn */}
                           <div className="d-flex justify-content-between mt-4">
                              <NavLink to={"/"} className="btn btn-primary">Continue Shopping</NavLink>
                             {/*  <NavLink to={"/Checkout"} className="btn btn-dark">Update Cart</NavLink> */}
                           </div>
                        </div>
                     </div>

                     {/*  sidebar */}
                     <div className="col-12 col-lg-4 col-md-5">
                        {/*  card */}
                        <div className="mb-5 card mt-6">
                           <div className="card-body p-6">
                              {/*  heading */}
                              <h2 className="h5 mb-4">Summary</h2>
                              <div className="card mb-2">

                                 <ul className="list-group list-group-flush">

                                    {/* ITEM SUBTOTAL */}
                                    <li className="list-group-item d-flex justify-content-between align-items-start">

                                       <div className="me-auto">
                                          <div>Item Subtotal</div>
                                       </div>

                                       <span>
                                          Rs.{itemSubtotal}
                                       </span>

                                    </li>

                                    {/* DELIVERY FEE */}
                                    <li className="list-group-item d-flex justify-content-between align-items-start">

                                       <div className="me-auto">
                                          <div>Delivery Fee</div>
                                       </div>

                                       <span>
                                          Rs.{deliveryFee}
                                       </span>

                                    </li>

                                    {/* TOTAL */}
                                    <li className="list-group-item d-flex justify-content-between align-items-start">

                                       <div className="me-auto">
                                          <div className="fw-bold">
                                             Total
                                          </div>
                                       </div>

                                       <span className="fw-bold">
                                          Rs.{grandTotal}
                                       </span>

                                    </li>

                                 </ul>

                              </div>
                              <div className="d-grid mb-1 mt-4">
                                 {/*  btn */}
                                 <button
                                    className={`btn w-100 ${
                                       cartItems.length === 0
                                          ? "btn-secondary"
                                          : "btn-primary"
                                    }`}
                                    onClick={handleCheckout}
                                    disabled={cartItems.length === 0}
                                 >
                                    Checkout
                                 </button>
                              </div>
                              {/*  text */}
                              <p>
                                 <small>
                                    By placing your order, you agree to be bound by the Freshcart
                                    <a href="#!">Terms of Service</a>
                                    and
                                    <a href="#!">Privacy Policy.</a>
                                 </small>
                              </p>

                              {/*  heading */}
                              {/*  <div className="mt-8">
                                 <h2 className="h5 mb-3">Add Promo or Gift Card</h2>
                                 <form>
                                    <div className="mb-2">
                                     
                                       <label for="giftcard" className="form-label sr-only">Email address</label>
                                       <input type="text" className="form-control" id="giftcard" placeholder="Promo or Gift Card" />
                                    </div>
                                    
                                    <div className="d-grid"><button type="submit" className="btn btn-outline-dark mb-1">Redeem</button></div>
                                    <p className="text-muted mb-0"><small>Terms & Conditions apply</small></p>
                                   
                                 </form>
                              </div> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
         <Footer />
      </>
   )
}
export default Cart