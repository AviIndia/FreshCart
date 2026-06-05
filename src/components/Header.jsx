import { NavLink } from 'react-router-dom'
import logo from "../assets/images/logo/logo-r.png";
import { useContext, useEffect, useState,useRef } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { getCartItems } from '../services/cart';
import { useCart } from '../context/CartContext';
import { updateCart } from "../services/cart";
import { updateGuestCartQty } from "../utils/cartHelper";
import { removeCartItem } from "../services/cart";
import { removeGuestCartItem } from "../utils/cartHelper";
import { useNavigate } from "react-router-dom";
import { useWishlist } from '../context/WishlistContext';
import { searchProduct } from '../services/products';
const Header = () => {
   const { cartItems, setCartItems, cartCount, setCartCount } = useCart();
   const [keyword, setKeyword] = useState("");
const [products, setProducts] = useState([]);
   const {wishCount} = useWishlist()
   const { categories } = useContext(CategoryContext);
   const token = localStorage.getItem("token");
   const userName = localStorage.getItem("name")
   const navigate = useNavigate();

const searchRef = useRef(null);
   const loadCartCount = async () => {

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

         const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

         setCartCount(guestCart.length);
         

      }

   };

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

         const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
         console.log("Guest cart", guestCart)
         setCartItems(guestCart);
         setCartCount(guestCart.length);

      }

   };




   useEffect(() => {

      loadCartCount(); loadCartItems();

   }, []);
/* =================== SEARCH PRODUCT================ */
useEffect(() => {

   if (!keyword.trim()) {
      setProducts([]);
      return;
   }

   const delay = setTimeout(async () => {

      try {

         const res = await searchProduct(keyword);

         if (res.status) {
            setProducts(res.data.products || []);
         }

      } catch (error) {
         console.log(error);
      }

   }, 300);

   return () => clearTimeout(delay);

}, [keyword]);
/* ==================== LIST REMOVE OUT SIDE CLICK====================== */
/* useEffect(() => {

   const handleClickOutside = (event) => {

      if (
         searchRef.current &&
         !searchRef.current.contains(event.target)
      ) {
         setProducts([]);
      }

   };

   document.addEventListener("mousedown", handleClickOutside);

   return () => {
      document.removeEventListener(
         "mousedown",
         handleClickOutside
      );
   };

}, []); */
   /* =================== CART QTY HANDLE ============== */
   const handleQuantity = async (item, type) => {
      console.log("Handle", item)
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

           

            const res = await updateCart(payload);

            

            if (res.status) {

               await loadCartItems();

            }

         } catch (error) {

            console.log(error);

         }

      }

      // GUEST USER
      else {

         const updatedCart = updateGuestCartQty(item.product_id, type);

         setCartItems(updatedCart);

         setCartCount(updatedCart.length);

      }

   }

   const handleRemoveCart = async (item) => {

      const token = localStorage.getItem("token");
      
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

const logout = () => {

   // REMOVE STORAGE
   localStorage.removeItem("token");
   localStorage.removeItem("user");

   // OPTIONAL
   localStorage.removeItem("guest_cart");

   // RESET CART
   setCartItems([]);
   setCartCount(0);

   // REDIRECT
   navigate("/");

};

   return (
      <div>
         {/* =================== TOP BAR STARTS=================== */}
         <div className="border-bottom">
            <div className="bg-light py-1">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6 col-12 text-center text-md-start"><span><i className="fas fa-envelope" aria-hidden="true"></i> avijitweb90@gmail.com | 9874438716</span></div>
                     <div className="col-6 text-end d-none d-md-block">
                        <div className="dropdown selectBox">
                           <a className="dropdown-toggle selectValue text-reset" href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false">
                              <span className="me-2">
                                 <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#selectedlang)">
                                       <path d="M0 0.5H16V12.5H0V0.5Z" fill="#012169" />
                                       <path d="M1.875 0.5L7.975 5.025L14.05 0.5H16V2.05L10 6.525L16 10.975V12.5H14L8 8.025L2.025 12.5H0V11L5.975 6.55L0 2.1V0.5H1.875Z" fill="white" />
                                       <path
                                          d="M10.6 7.525L16 11.5V12.5L9.225 7.525H10.6ZM6 8.025L6.15 8.9L1.35 12.5H0L6 8.025ZM16 0.5V0.575L9.775 5.275L9.825 4.175L14.75 0.5H16ZM0 0.5L5.975 4.9H4.475L0 1.55V0.5Z"
                                          fill="#C8102E" />
                                       <path d="M6.025 0.5V12.5H10.025V0.5H6.025ZM0 4.5V8.5H16V4.5H0Z" fill="white" />
                                       <path d="M0 5.325V7.725H16V5.325H0ZM6.825 0.5V12.5H9.225V0.5H6.825Z" fill="#C8102E" />
                                    </g>
                                    <defs>
                                       <clipPath id="selectedlang">
                                          <rect width="16" height="12" fill="white" transform="translate(0 0.5)" />
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </span>
                              English
                           </a>

                           <ul className="dropdown-menu">
                              <li>
                                 <a className="dropdown-item" href="javascript:void(0)">
                                    <span className="me-2">
                                       <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#selectedlang)">
                                             <path d="M0 0.5H16V12.5H0V0.5Z" fill="#012169" />
                                             <path d="M1.875 0.5L7.975 5.025L14.05 0.5H16V2.05L10 6.525L16 10.975V12.5H14L8 8.025L2.025 12.5H0V11L5.975 6.55L0 2.1V0.5H1.875Z" fill="white" />
                                             <path
                                                d="M10.6 7.525L16 11.5V12.5L9.225 7.525H10.6ZM6 8.025L6.15 8.9L1.35 12.5H0L6 8.025ZM16 0.5V0.575L9.775 5.275L9.825 4.175L14.75 0.5H16ZM0 0.5L5.975 4.9H4.475L0 1.55V0.5Z"
                                                fill="#C8102E" />
                                             <path d="M6.025 0.5V12.5H10.025V0.5H6.025ZM0 4.5V8.5H16V4.5H0Z" fill="white" />
                                             <path d="M0 5.325V7.725H16V5.325H0ZM6.825 0.5V12.5H9.225V0.5H6.825Z" fill="#C8102E" />
                                          </g>
                                          <defs>
                                             <clipPath id="selectedlang">
                                                <rect width="16" height="12" fill="white" transform="translate(0 0.5)" />
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </span>
                                    English
                                 </a>
                              </li>
                              <li>
                                 <a className="dropdown-item" href="javascript:void(0)">
                                    <span className="me-2">
                                       <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_5543_19751)">
                                             <path d="M0 8.5H16V12.5H0V8.5Z" fill="#FFCE00" />
                                             <path d="M0 0.5H16V4.5H0V0.5Z" fill="black" />
                                             <path d="M0 4.5H16V8.5H0V4.5Z" fill="#DD0000" />
                                          </g>
                                          <defs>
                                             <clipPath id="clip0_5543_19751">
                                                <rect width="16" height="12" fill="white" transform="translate(0 0.5)" />
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </span>
                                    Deutsch
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>{/* -------------- End Topbar---------------- */}
            <div className="py-2">
               <div className="container">
                  <div className="row w-100 align-items-center gx-lg-2 gx-0">
                     <div className="col-xxl-2 col-lg-3 col-md-6 col-5">
                        <NavLink to="/" className="navbar-brand d-none d-lg-block">
                           <img src={logo} alt="eCommerce HTML Template" style={{"width":"200px"}}/>
                        </NavLink>
                        <div className="d-flex justify-content-between w-100 d-lg-none">
                           <NavLink to="/" className="navbar-brandNavLink">
                              <img src={logo} style={{"width":"200px"}}/>
                           </NavLink>
                        </div>
                     </div>
                     <div className="col-xxl-5 col-lg-5 d-none d-lg-block position-relative" ref={searchRef}>

                           <div className="input-group">

                              <input
                                 type="search"
                                 className="form-control rounded"
                                 placeholder="Search products..."
                                 value={keyword}
                                 onChange={(e) => setKeyword(e.target.value)}
                              />

                           </div>
                           {products.length > 0 && (

                              <div
                                 className="position-absolute bg-white shadow rounded w-100 mt-1"
                                 style={{
                                    zIndex: 9999,
                                    maxHeight: "350px",
                                    overflowY: "auto"
                                 }}
                              >

                                 {products.map((item) => (

                                    <NavLink
                                       key={item.id}
                                       to={`/productSingle/${item.category_id}/${item.id}`}
                                       className="d-flex align-items-center p-2 border-bottom text-decoration-none text-dark"
                                    >

                                       <img
                                          src={item.thumbnail}
                                          alt={item.name}
                                          width="50"
                                          height="50"
                                          className="me-2 rounded"
                                       />

                                       <div>

                                          <div>{item.name}</div>

                                          <small className="text-muted">
                                             {item.category_name}
                                          </small>

                                       </div>

                                    </NavLink>

                                 ))}

                              </div>

                           )}

                        </div>
                     <div className="col-md-2 col-xxl-3 d-none d-lg-block">

                        <button type="button" className="btn btn-outline-gray-400 text-muted" data-bs-toggle="modal" data-bs-target="#locationModal">
                           <i className="feather-icon icon-map-pin me-2"></i>
                           Location
                        </button>
                     </div>
                     <div className="col-lg-2 col-xxl-2 text-end col-md-6 col-7">
                        <div className="list-inline">
                           <div className="list-inline-item me-5">
                              <NavLink to="/MyWishlist" className="text-muted position-relative">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-heart">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                 </svg>
                                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {wishCount > 0 && wishCount}
                                    
                                 </span>
                              </NavLink>
                           </div>
                           {/*         <div className="list-inline-item me-5">
                              <a href="#!" className="text-muted" data-bs-toggle="modal" data-bs-target="#userModal">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-user">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                 </svg>
                              </a>
                           </div> */}
                           <div className="list-inline-item me-5 dropdown">

                              {/* DROPDOWN BUTTON */}
                              <a
                                 href="#!"
                                 className="text-muted"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-user"
                                 >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                 </svg>
                              </a>

                              {/* DROPDOWN MENU */}
                              <ul className="dropdown-menu dropdown-menu-end">

                                 {/* USER NAME */}
                                 {token && (
                                    <>
                                       <li className="dropdown-header">
                                          Hello, {userName}
                                       </li>

                                       <li>
                                          <hr className="dropdown-divider" />
                                       </li>
                                    </>
                                 )}

                                 {/* WITHOUT LOGIN */}
                                 {!token && (
                                    <>
                                       <li>
                                          <NavLink to="/Signin" className="dropdown-item">
                                             Sign In
                                          </NavLink>
                                       </li>

                                       <li>
                                          <NavLink to="/Signup" className="dropdown-item">
                                             Signup
                                          </NavLink>
                                       </li>

                                       <li>
                                          <NavLink
                                             to="/ForgotPassword"
                                             className="dropdown-item"
                                          >
                                             Forgot Password
                                          </NavLink>
                                       </li>
                                    </>
                                 )}

                                 {/* AFTER LOGIN */}
                                 {token && (
                                    <>
                                       <li>
                                          <NavLink to="/MyOrder" className="dropdown-item">
                                             Orders
                                          </NavLink>
                                       </li>

                                       <li>
                                          <NavLink to="/Settings" className="dropdown-item">
                                             Settings
                                          </NavLink>
                                       </li>

                                       <li>
                                          <NavLink to="/MyAddress" className="dropdown-item">
                                             Address
                                          </NavLink>
                                       </li>

                                   

                                       <li>
                                          <NavLink onClick={logout} className="dropdown-item">
                                             Logout
                                          </NavLink>
                                       </li>
                                    </>
                                 )}

                              </ul>

                           </div>
                           <div className="list-inline-item me-5 me-lg-0">
                              <a className="text-muted position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" href="#offcanvasExample" role="button" aria-controls="offcanvasRight">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-bag">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                 </svg>
                                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {cartCount}
                                    <span className="visually-hidden">unread messages</span>
                                 </span>
                              </a>
                           </div>
                           <div className="list-inline-item d-inline-block d-lg-none">

                              <button
                                 className="navbar-toggler collapsed"
                                 type="button"
                                 data-bs-toggle="offcanvas"
                                 data-bs-target="#navbar-default"
                                 aria-controls="navbar-default"
                                 aria-label="Toggle navigation">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-text-indent-left text-primary" viewBox="0 0 16 16">
                                    <path
                                       d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* ================= HEADER START ================================== */}
            <nav className="navbar navbar-expand-lg navbar-light navbar-default py-0 pb-lg-4" aria-label="Offcanvas navbar large">
               <div className="container">
                  <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-default" aria-labelledby="navbar-defaultLabel">
                     <div className="offcanvas-header pb-1">
                        <NavLink to="/" className="navbar-brand">
                           <img src={logo} style={{"width":"150px"}}/>
                        </NavLink>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                     </div>
                     <div className="offcanvas-body">
                        <div className="d-block d-lg-none mb-4" ref={searchRef}>
                            <div className="input-group">

                              <input
                                 type="search"
                                 className="form-control rounded"
                                 placeholder="Search products..."
                                 value={keyword}
                                 onChange={(e) => setKeyword(e.target.value)}
                              />

                           </div>
                           {products.length > 0 && (

                              <div
                                 className="position-absolute bg-white shadow rounded w-100 mt-1"
                                 style={{
                                    zIndex: 9999,
                                    maxHeight: "350px",
                                    overflowY: "auto"
                                 }}
                              >

                                 {products.map((item) => (

                                    <NavLink
                                       key={item.id}
                                       to={`/productSingle/${item.category_id}/${item.id}`}
                                       className="d-flex align-items-center p-2 border-bottom text-decoration-none text-dark"
                                    >

                                       <img
                                          src={item.thumbnail}
                                          alt={item.name}
                                          width="50"
                                          height="50"
                                          className="me-2 rounded"
                                       />

                                       <div>

                                          <div>{item.name}</div>

                                          <small className="text-muted">
                                             {item.category_name}
                                          </small>

                                       </div>

                                    </NavLink>

                                 ))}

                              </div>

                           )}

                          {/*  <div className="mt-2">
                              <button type="button" className="btn btn-outline-gray-400 text-muted w-100" data-bs-toggle="modal" data-bs-target="#locationModal">
                                 <i className="feather-icon icon-map-pin me-2"></i>
                                 Pick Location
                              </button>
                           </div> */}
                        </div>
                        <div className="d-block d-lg-none mb-4">
                           <a
                              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                              data-bs-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample">
                              <span className="me-2">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-grid">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                 </svg>
                              </span>
                              All Categories
                           </a>
                           <div className="collapse mt-2" id="collapseExample">
                              <div className="card card-body">
                                 <ul className="mb-0 list-unstyled">
                                    {categories?.map((item) => (

                                       <li key={item.id}>

                                          <NavLink
                                             to={`/productByCategory/${item.id}`}
                                             className="dropdown-item"
                                          >
                                             {item.category_name}
                                          </NavLink>

                                       </li>

                                    ))}


                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown me-3 d-none d-lg-block">
                           <button className="btn btn-primary px-6" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <span className="me-1">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-grid">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                 </svg>
                              </span>
                              All Category
                           </button>
                           <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              {categories?.map((item) => (

                                 <li key={item.id}>

                                    <NavLink
                                       to={`/productByCategory/${item.id}`}
                                       className="dropdown-item"
                                    >
                                       {item.category_name}
                                    </NavLink>

                                 </li>

                              ))}

                           </ul>
                        </div>
                        <div>
                           <ul className="navbar-nav align-items-center">

                              <li className="nav-item w-100 w-lg-auto">
                                 <NavLink to="/" className="nav-link">
                                    <i className="bi bi-house-door-fill"></i> Home
                                 </NavLink>
                              </li>

                              <li className="nav-item w-100 w-lg-auto">
                                 <NavLink to="/Shop" className="nav-link">
                                    <i className="bi bi-bag-fill"></i> Shop
                                 </NavLink>
                              </li>

                              <li className="nav-item w-100 w-lg-auto">
                                 <NavLink to="/Cart" className="nav-link">
                                    <i className="bi bi-cart"></i> Cart
                                 </NavLink>
                              </li>

                              {/* CHECKOUT CONDITION */}
                              <li className="nav-item w-100 w-lg-auto">
                                 <NavLink
                                    to={token ? "/Checkout" : "/Signin"}
                                    className="nav-link"
                                 >
                                    <i className="bi bi-receipt"></i> Checkout
                                 </NavLink>
                              </li>
                           
                              {/* ACCOUNT MENU */}
                              <li className="nav-item dropdown w-100 w-lg-auto">
                                           <a
                                       className="nav-link dropdown-toggle"
                                       role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false"
                                    >
                                       <i className="bi bi-person-circle"></i>{" "}
                                       {token && userName ? `Hello, ${userName}` : "Account"}
                                    </a>
                           

                                 <ul className="dropdown-menu">

                                    {/* WITHOUT LOGIN */}
                                    {!token && (
                                       <>
                                          <li>
                                             <NavLink to="/Signin" className="dropdown-item">
                                                Sign in
                                             </NavLink>
                                          </li>

                                          <li>
                                             <NavLink to="/Signup" className="dropdown-item">
                                                Signup
                                             </NavLink>
                                          </li>

                                          <li>
                                             <NavLink to="/ForgotPassword" className="dropdown-item">
                                                Forgot Password
                                             </NavLink>
                                          </li>
                                       </>
                                    )}

                                    

                                    {/* AFTER LOGIN */}
                                    {token && (
                                       <li className="dropdown-submenu dropend">

                                          <NavLink
                                             className="dropdown-item dropdown-list-group-item dropdown-toggle"
                                          >
                                             My Account
                                          </NavLink>

                                          <ul className="dropdown-menu">

                                             <li>
                                                <NavLink to="/MyOrder" className="dropdown-item">
                                                   Orders
                                                </NavLink>
                                             </li>

                                             <li>
                                                <NavLink to="/Settings" className="dropdown-item">
                                                   Settings
                                                </NavLink>
                                             </li>

                                             <li>
                                                <NavLink to="/MyAddress" className="dropdown-item">
                                                   Address
                                                </NavLink>
                                             </li>

                                             

                                             <li>
                                                <NavLink onClick={logout} className="dropdown-item">
                                                   Logout
                                                </NavLink>
                                             </li>

                                          </ul>

                                       </li>
                                    )}

                                 </ul>
                              </li>

                             

                           </ul>
                        </div>
                     </div>

                  </div>
               </div>
            </nav>


           {/*  <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-4">
                     <div className="modal-header border-0">
                        <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Sign Up</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <form className="needs-validation" noValidate>
                           <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input type="text" className="form-control" id="fullName" placeholder="Enter Your Name" required />
                              <div className="invalid-feedback">Please enter name.</div>
                           </div>
                           <div className="mb-3">
                              <label className="form-label">Email address</label>
                              <input type="email" className="form-control" id="email" placeholder="Enter Email address" required />
                              <div className="invalid-feedback">Please enter email.</div>
                           </div>
                           <div className="mb-3">
                              <label className="form-label">Password</label>
                              <input type="password" className="form-control" id="password" placeholder="Enter Password" required />
                              <div className="invalid-feedback">Please enter password.</div>
                              <small className="form-text">
                                 By Signup, you agree to our
                                 <a href="#!">Terms of Service</a>
                                 &
                                 <a href="#!">Privacy Policy</a>
                              </small>
                           </div>

                           <button type="submit" className="btn btn-primary" type="submit">Sign Up</button>
                        </form>
                     </div>
                     <div className="modal-footer border-0 justify-content-center">
                        Already have an account?
                        <a href="#">Sign in</a>
                     </div>
                  </div>
               </div>
            </div> */}



            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
               <div className="offcanvas-header border-bottom">
                  <div className="text-start">
                     <h5 id="offcanvasRightLabel" className="mb-0 fs-4">Grocery Shop Cart</h5>
                     {/* <small>Location in 382480</small> */}
                  </div>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
               </div>
               <div className="offcanvas-body">
                  <div>

                     <div className="alert alert-success p-2" role="alert">
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
                                                   Qty: {item.quantity}
                                                </small>
                                             </span>

                                             <div className="mt-2 small lh-1">

                                                <button
                                                   type="button"
                                                   className="btn btn-link text-decoration-none text-inherit p-0 border-0"
                                                   onClick={() => handleRemoveCart(item)}
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

                     <div className="d-flex justify-content-between mt-4">
                        <NavLink to={"/"} className="btn btn-primary">Continue Shopping</NavLink>
                        <NavLink to={"/Checkout"}  className="btn btn-dark">Checkout</NavLink>
                     </div>
                  </div>
               </div>
            </div>


            {/* <div className="modal fade" id="locationModal" tabIndex="-1" aria-labelledby="locationModalLabel" aria-hidden="true">
               <div className="modal-dialog modal-sm modal-dialog-centered">
                  <div className="modal-content">
                     <div className="modal-body p-6">
                        <div className="d-flex justify-content-between align-items-start">
                           <div>
                              <h5 className="mb-1" id="locationModalLabel">Choose your Delivery Location</h5>
                              <p className="mb-0 small">Enter your address and we will specify the offer you area.</p>
                           </div>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="my-5">
                           <input type="search" className="form-control" placeholder="Search your area" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <h6 className="mb-0">Select Location</h6>
                           <a href="#" className="btn btn-outline-gray-400 text-muted btn-sm">Clear All</a>
                        </div>
                        <div>
                           <div data-simplebar style={{ "height": "300px" }}>
                              <div className="list-group list-group-flush">
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action active">
                                    <span>Alabama</span>
                                    <span>Min:$20</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Alaska</span>
                                    <span>Min:$30</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Arizona</span>
                                    <span>Min:$50</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>California</span>
                                    <span>Min:$29</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Colorado</span>
                                    <span>Min:$80</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Florida</span>
                                    <span>Min:$90</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Arizona</span>
                                    <span>Min:$50</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>California</span>
                                    <span>Min:$29</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Colorado</span>
                                    <span>Min:$80</span>
                                 </a>
                                 <a href="#" className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action">
                                    <span>Florida</span>
                                    <span>Min:$90</span>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   )
}
export default Header