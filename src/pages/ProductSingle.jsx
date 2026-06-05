import { Link, NavLink, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useEffect, useState } from "react";
import { productSingle } from "../services/products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Autoplay } from "swiper/modules";
import { addCart } from "../services/cart";
import { addToGuestCart } from "../utils/cartHelper";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import { useWishlist } from "../context/WishlistContext";


const ProductSingle = () => {
   const { category_id, id } = useParams();
   const [qty, setQty] = useState(1);
  const { cartCount,setCartCount,setCartItems,loadCartItems } = useCart();
   const [productData, setProductData] = useState({});
   const [relatedProduct, setRelatedProduct] = useState([])
   const { addWishListData } = useWishlist();
   useEffect(() => {
      const productSingleData = async () => {
         try {
            const res = await productSingle(id)
            if (res.status) {
               setProductData(res.data.product);
               setRelatedProduct(res.data.related_products)
               console.log(res.data.product)
            }
         } catch (error) {
            console.log(error)
         }
      }
      productSingleData()
   }, [id])

   /* ======================= ADD TO CART================ */

const handleAddToCart = async (product) => {

   const token = localStorage.getItem("token");

   // LOGGED USER
   if (token) {

      try {

         const payload = {
            product_id: product.id,
            qty: qty
         };

         const res = await addCart(payload);

         if (res.status) {

            await loadCartItems();

            
                Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Product Added to cart",
                        });

         }

      } catch (error) {

         console.log(error);

      }

   }

   // GUEST USER
   else {

      const updatedCart = addToGuestCart({
         ...product,
         qty
      });

      setCartItems(updatedCart);

      setCartCount(updatedCart.length);

          Swal.fire({
         icon: "success",
         title: "Success",
         text: "Product added to guest cart",
         });

   }

};

   return (
      <div>
         <Header />
         <div className="mt-4">
            <div className="container">

               {/*-- row --*/}
               <div className="row">
                  {/*-- col --*/}
                  <div className="col-12">
                     {/*-- breadcrumb --*/}
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                           <li className="breadcrumb-item"><NavLink href="#">Home</NavLink></li>
                           <li className="breadcrumb-item"><NavLink href="#">Bakery Biscuits</NavLink></li>

                           <li className="breadcrumb-item active" aria-current="page">Napolitanke Ljesnjak</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         <section className="mt-8">
            <div className="container">
               <div className="row">

                  {/* LEFT SIDE IMAGE SECTION */}
                  <div className="col-md-5 col-xl-6">

                     {/* Product Images */}
                     <div className="product" id="product">

                        {
                           productData?.gallery_images?.length > 0
                              ? (
                                 productData.gallery_images.map((img, index) => (
                                    <div key={index}>
                                       <div className="zom">
                                          <img
                                             src={img}
                                             alt={productData.name}
                                             className="img-fluid"
                                          />
                                       </div>
                                    </div>
                                 ))
                              )
                              : (
                                 <div>
                                    <div className="zom">
                                       <img
                                          src={productData.thumbnail}
                                          alt={productData.name}
                                          className="img-fluid"
                                       />
                                    </div>
                                 </div>
                              )
                        }

                     </div>

                     {/* Thumbnails */}
                     <div className="product-tools">
                        <div className="thumbnails row g-3" id="productThumbnails">

                           {
                              productData?.gallery_images?.length > 0
                                 ? (
                                    productData.gallery_images.map((img, index) => (
                                       <div className="col-3" key={index}>
                                          <div className="thumbnails-img">
                                             <img
                                                src={img}
                                                alt={productData.name}
                                                className="img-fluid"
                                             />
                                          </div>
                                       </div>
                                    ))
                                 )
                                 : (
                                    <div className="col-3">
                                       <div className="thumbnails-img">
                                          <img
                                             src={productData.thumbnail}
                                             alt={productData.name}
                                             className="img-fluid"
                                          />
                                       </div>
                                    </div>
                                 )
                           }

                        </div>
                     </div>

                  </div>

                  {/* RIGHT SIDE CONTENT */}
                  <div className="col-md-7 col-xl-6">

                     <div className="ps-lg-10 mt-6 mt-md-0">

                        <a href="#!" className="mb-4 d-block">
                           {productData.category_name}
                        </a>

                        <h1 className="mb-1">{productData.name}</h1>

                        <div className="mb-4">
                           <small className="text-warning">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-half"></i>
                           </small>

                           <a href="#" className="ms-2">
                              ({productData.total_reviews || 0} reviews)
                           </a>
                        </div>

                        {/* PRICE */}
                        <div className="fs-4">

                           <span className="fw-bold text-dark">
                              Rs.{productData.final_price}
                           </span>

                           {
                              productData.discount_percent > 0 && (
                                 <>
                                    <span className="text-decoration-line-through text-muted ms-2">
                                       Rs.{productData.price}
                                    </span>

                                    <span>
                                       <small className="fs-6 ms-2 text-danger">
                                          {productData.discount_percent}% OFF
                                       </small>
                                    </span>
                                 </>
                              )
                           }

                        </div>

                        <hr className="my-6" />

                        {/* QUANTITY */}
                        <div>
                           <div className="input-group input-spinner">

                              <input
                                       type="button"
                                       value="-"
                                       className="button-minus btn btn-sm"
                                       onClick={() => {
                                          if (qty > 1) {
                                             setQty(qty - 1);
                                          }
                                       }}
                                    />

                                    <input
                                       type="number"
                                       value={qty}
                                       readOnly
                                       className="quantity-field form-control-sm form-input"
                                    />

                                    <input
                                       type="button"
                                       value="+"
                                       className="button-plus btn btn-sm"
                                       onClick={() => setQty(qty + 1)}
                                    />

                           </div>
                        </div>

                        {/* ========= ADD TO CART BUTTONS==============*/}
                        <div className="mt-3 row justify-content-start g-2 align-items-center">

                           <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
                              <button type="button" className="btn btn-primary" onClick={() => handleAddToCart(productData)}>

                                 <i className="feather-icon icon-shopping-bag me-2"></i>

                                 Add to cart

                              </button>
                           </div>

                           <div className="col-md-4 col-4">

                            {/*   <a
                                 className="btn btn-light"
                                 href="#"
                              >
                                 <i className="bi bi-arrow-left-right"></i>
                              </a>
 */}
                              <button
                                 className="btn btn-light"
                                onClick={() => addWishListData(productData)}
                              >
                                 <i className="feather-icon icon-heart"></i>
                              </button>

                           </div>

                        </div>

                        <hr className="my-6" />

                        {/* TABLE */}
                        <div>

                           <table className="table table-borderless mb-0">

                              <tbody>

                                 <tr>
                                    <td>Product Code:</td>
                                    <td>{productData.sku}</td>
                                 </tr>

                                 <tr>
                                    <td>Availability:</td>
                                    <td>
                                       {
                                          productData.stock > 0
                                             ? "In Stock"
                                             : "Out Of Stock"
                                       }
                                    </td>
                                 </tr>

                                 <tr>
                                    <td>Brand:</td>
                                    <td>{productData.brand}</td>
                                 </tr>

                                 <tr>
                                    <td>Weight:</td>
                                    <td>{productData.weight} gm</td>
                                 </tr>

                              </tbody>

                           </table>

                        </div>

                     </div>

                  </div>

               </div>
            </div>
         </section>
         <section className="mt-lg-14 mt-8">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <ul className="nav nav-pills nav-lb-tab" id="myTab" role="tablist">
                        {/*-- nav item --*/}
                        <li className="nav-item" role="presentation">
                           {/*-- btn --*/}
                           <button
                              className="nav-link active"
                              id="product-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#product-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="product-tab-pane"
                              aria-selected="true">
                              Product Details
                           </button>
                        </li>
                        {/*-- nav item --*/}
                        <li className="nav-item" role="presentation">
                           {/*-- btn --*/}
                           <button
                              className="nav-link"
                              id="details-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#details-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="details-tab-pane"
                              aria-selected="false">
                              Information
                           </button>
                        </li>
                        {/*-- nav item --*/}
                        <li className="nav-item" role="presentation">
                           {/*-- btn --*/}
                           <button
                              className="nav-link"
                              id="reviews-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#reviews-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="reviews-tab-pane"
                              aria-selected="false">
                              Reviews
                           </button>
                        </li>
                        {/*-- nav item --*/}
                        <li className="nav-item" role="presentation">
                           {/*-- btn --*/}
                           <button
                              className="nav-link"
                              id="sellerInfo-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#sellerInfo-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="sellerInfo-tab-pane"
                              aria-selected="false"
                              disabled>
                              Seller Info
                           </button>
                        </li>
                     </ul>
                     {/*-- tab content --*/}
                     <div className="tab-content" id="myTabContent">
                        {/*-- tab pane --*/}
                        <div className="tab-pane fade show active" id="product-tab-pane" role="tabpanel" aria-labelledby="product-tab" tabindex="0">
                           <div className="my-8">
                              <div className="mb-5">
                                 {/*-- text --*/}
                                 <h4 className="mb-1">Description</h4>
                                 <p className="mb-0">
                                    {productData.description}
                                 </p>
                              </div>


                           </div>
                        </div>
                        {/*-- tab pane --*/}
                        <div className="tab-pane fade" id="details-tab-pane" role="tabpanel" aria-labelledby="details-tab" tabindex="0">
                           <div className="my-8">
                              <div className="row">
                                 <div className="col-12">
                                    <h4 className="mb-4">Details</h4>
                                 </div>
                                 <div className="col-12 col-lg-6">
                                    <table className="table table-striped">
                                       {/*-- table --*/}
                                       <tbody>
                                          <tr>
                                             <th>Weight</th>
                                             <td>1000 Grams</td>
                                          </tr>
                                          <tr>
                                             <th>Ingredient Type</th>
                                             <td>Vegetarian</td>
                                          </tr>
                                          <tr>
                                             <th>Brand</th>
                                             <td>Dmart</td>
                                          </tr>
                                          <tr>
                                             <th>Item Package Quantity</th>
                                             <td>1</td>
                                          </tr>
                                          <tr>
                                             <th>Form</th>
                                             <td>Larry the Bird</td>
                                          </tr>
                                          <tr>
                                             <th>Manufacturer</th>
                                             <td>Dmart</td>
                                          </tr>
                                          <tr>
                                             <th>Net Quantity</th>
                                             <td>340.0 Gram</td>
                                          </tr>
                                          <tr>
                                             <th>Product Dimensions</th>
                                             <td>9.6 x 7.49 x 18.49 cm</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                                 <div className="col-12 col-lg-6">
                                    <table className="table table-striped">
                                       {/*-- table --*/}
                                       <tbody>
                                          <tr>
                                             <th>ASIN</th>
                                             <td>SB0025UJ75W</td>
                                          </tr>
                                          <tr>
                                             <th>Best Sellers Rank</th>
                                             <td>#2 in Fruits</td>
                                          </tr>
                                          <tr>
                                             <th>Date First Available</th>
                                             <td>30 April 2022</td>
                                          </tr>
                                          <tr>
                                             <th>Item Weight</th>
                                             <td>500g</td>
                                          </tr>
                                          <tr>
                                             <th>Generic Name</th>
                                             <td>Banana Robusta</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/*-- tab pane --*/}
                        <div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
                           <div className="my-8">
                              {/*-- row --*/}
                              <div className="row">
                                 <div className="col-md-4">
                                    <div className="me-lg-12 mb-6 mb-md-0">
                                       <div className="mb-5">
                                          {/*-- title --*/}
                                          <h4 className="mb-3">Customer reviews</h4>
                                          <span>
                                             {/*-- rating --*/}
                                             <small className="text-warning">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-half"></i>
                                             </small>
                                             <span className="ms-3">4.1 out of 5</span>
                                             <small className="ms-3">11,130 global ratings</small>
                                          </span>
                                       </div>
                                       <div className="mb-8">
                                          {/*-- progress --*/}
                                          <div className="d-flex align-items-center mb-2">
                                             <div className="text-nowrap me-3 text-muted">
                                                <span className="d-inline-block align-middle text-muted">5</span>
                                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                                             </div>
                                             <div className="w-100">
                                                <div className="progress" style={{ "height": "6px" }}>
                                                   <div className="progress-bar bg-warning" role="progressbar" style={{ "width": "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                             </div>
                                             <span className="text-muted ms-3">53%</span>
                                          </div>
                                          {/*-- progress --*/}
                                          <div className="d-flex align-items-center mb-2">
                                             <div className="text-nowrap me-3 text-muted">
                                                <span className="d-inline-block align-middle text-muted">4</span>
                                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                                             </div>
                                             <div className="w-100">
                                                <div className="progress" style={{ "height": "6px" }}>
                                                   <div className="progress-bar bg-warning" role="progressbar" style={{ "width": "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="50"></div>
                                                </div>
                                             </div>
                                             <span className="text-muted ms-3">22%</span>
                                          </div>
                                          {/*-- progress --*/}
                                          <div className="d-flex align-items-center mb-2">
                                             <div className="text-nowrap me-3 text-muted">
                                                <span className="d-inline-block align-middle text-muted">3</span>
                                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                                             </div>
                                             <div className="w-100">
                                                <div className="progress" style={{ "height": "6px" }}>
                                                   <div className="progress-bar bg-warning" role="progressbar" style={{ "width": "35%" }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="35"></div>
                                                </div>
                                             </div>
                                             <span className="text-muted ms-3">14%</span>
                                          </div>
                                          {/*-- progress --*/}
                                          <div className="d-flex align-items-center mb-2">
                                             <div className="text-nowrap me-3 text-muted">
                                                <span className="d-inline-block align-middle text-muted">2</span>
                                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                                             </div>
                                             <div className="w-100">
                                                <div className="progress" style={{ "height": "6px" }}>
                                                   <div className="progress-bar bg-warning" role="progressbar" style={{ "width": "22%" }} aria-valuenow="22" aria-valuemin="0" aria-valuemax="22"></div>
                                                </div>
                                             </div>
                                             <span className="text-muted ms-3">5%</span>
                                          </div>
                                          {/*-- progress --*/}
                                          <div className="d-flex align-items-center mb-2">
                                             <div className="text-nowrap me-3 text-muted">
                                                <span className="d-inline-block align-middle text-muted">1</span>
                                                <i className="bi bi-star-fill ms-1 small text-warning"></i>
                                             </div>
                                             <div className="w-100">
                                                <div className="progress" style={{ "height": "6px" }}>
                                                   <div className="progress-bar bg-warning" role="progressbar" style={{ "width": "14%" }} aria-valuenow="14" aria-valuemin="0" aria-valuemax="14"></div>
                                                </div>
                                             </div>
                                             <span className="text-muted ms-3">7%</span>
                                          </div>
                                       </div>
                                       <div className="d-grid">
                                          <h4>Review this product</h4>
                                          <p className="mb-0">Share your thoughts with other customers.</p>
                                          <a href="#" className="btn btn-outline-gray-400 mt-4 text-muted">Write the Review</a>
                                       </div>
                                    </div>
                                 </div>
                                 {/*-- col --*/}
                                 <div className="col-md-8">
                                    <div className="mb-10">
                                       <div className="d-flex justify-content-between align-items-center mb-8">
                                          <div>
                                             {/*-- heading --*/}
                                             <h4>Reviews</h4>
                                          </div>
                                          <div>
                                             <select className="form-select">
                                                <option selected>Top Reviews</option>
                                                <option value="Most Recent">Most Recent</option>
                                             </select>
                                          </div>
                                       </div>
                                       <div className="d-flex border-bottom pb-6 mb-6">
                                          {/*-- img --*/}
                                          {/*-- img --*/}
                                          <img src="../assets/images/avatar/avatar-10.jpg" alt="" className="rounded-circle avatar-lg" />
                                          <div className="ms-5">
                                             <h6 className="mb-1">Shankar Subbaraman</h6>
                                             {/*-- select option --*/}
                                             {/*-- content --*/}
                                             <p className="small">
                                                <span className="text-muted">30 December 2022</span>
                                                <span className="text-primary ms-3 fw-bold">Verified Purchase</span>
                                             </p>
                                             {/*-- rating --*/}
                                             <div className="mb-2">
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <span className="ms-3 text-dark fw-bold">Need to recheck the weight at delivery point</span>
                                             </div>
                                             {/*-- text--*/}
                                             <p>
                                                Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between.
                                                FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc. .
                                             </p>
                                             <div>
                                                <div className="border icon-shape icon-lg border-2">
                                                   {/*-- img --*/}
                                                   <img src="../assets/images/products/product-img-1.jpg" alt="" className="img-fluid" />
                                                </div>
                                                <div className="border icon-shape icon-lg border-2 ms-1">
                                                   {/*-- img --*/}
                                                   <img src="../assets/images/products/product-img-2.jpg" alt="" className="img-fluid" />
                                                </div>
                                                <div className="border icon-shape icon-lg border-2 ms-1">
                                                   {/*-- img --*/}
                                                   <img src="../assets/images/products/product-img-3.jpg" alt="" className="img-fluid" />
                                                </div>
                                             </div>
                                             {/*-- icon --*/}
                                             <div className="d-flex justify-content-end mt-4">
                                                <a href="#" className="text-muted">
                                                   <i className="feather-icon icon-thumbs-up me-1"></i>
                                                   Helpful
                                                </a>
                                                <a href="#" className="text-muted ms-4">
                                                   <i className="feather-icon icon-flag me-2"></i>
                                                   Report abuse
                                                </a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                          {/*-- img --*/}
                                          <img src="../assets/images/avatar/avatar-12.jpg" alt="" className="rounded-circle avatar-lg" />
                                          <div className="ms-5">
                                             <h6 className="mb-1">Robert Thomas</h6>
                                             {/*-- content --*/}
                                             <p className="small">
                                                <span className="text-muted">29 December 2022</span>
                                                <span className="text-primary ms-3 fw-bold">Verified Purchase</span>
                                             </p>
                                             {/*-- rating --*/}
                                             <div className="mb-2">
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star text-warning"></i>
                                                <span className="ms-3 text-dark fw-bold">Need to recheck the weight at delivery point</span>
                                             </div>

                                             <p>
                                                Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between.
                                                FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc. .
                                             </p>

                                             {/*-- icon --*/}
                                             <div className="d-flex justify-content-end mt-4">
                                                <a href="#" className="text-muted">
                                                   <i className="feather-icon icon-thumbs-up me-1"></i>
                                                   Helpful
                                                </a>
                                                <a href="#" className="text-muted ms-4">
                                                   <i className="feather-icon icon-flag me-2"></i>
                                                   Report abuse
                                                </a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                          {/*-- img --*/}
                                          <img src="../assets/images/avatar/avatar-9.jpg" alt="" className="rounded-circle avatar-lg" />
                                          <div className="ms-5">
                                             <h6 className="mb-1">Barbara Tay</h6>
                                             {/*-- content --*/}
                                             <p className="small">
                                                <span className="text-muted">28 December 2022</span>
                                                <span className="text-danger ms-3 fw-bold">Unverified Purchase</span>
                                             </p>
                                             {/*-- rating --*/}
                                             <div className="mb-2">
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star text-warning"></i>
                                                <span className="ms-3 text-dark fw-bold">Need to recheck the weight at delivery point</span>
                                             </div>

                                             <p>Everytime i ordered from fresh i got greenish yellow bananas just like i wanted so go for it , its happens very rare that u get over riped ones.</p>

                                             {/*-- icon --*/}
                                             <div className="d-flex justify-content-end mt-4">
                                                <a href="#" className="text-muted">
                                                   <i className="feather-icon icon-thumbs-up me-1"></i>
                                                   Helpful
                                                </a>
                                                <a href="#" className="text-muted ms-4">
                                                   <i className="feather-icon icon-flag me-2"></i>
                                                   Report abuse
                                                </a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                          {/*-- img --*/}
                                          <img src="../assets/images/avatar/avatar-8.jpg" alt="" className="rounded-circle avatar-lg" />
                                          <div className="ms-5 flex-grow-1">
                                             <h6 className="mb-1">Sandra Langevin</h6>
                                             {/*-- content --*/}
                                             <p className="small">
                                                <span className="text-muted">8 December 2022</span>
                                                <span className="text-danger ms-3 fw-bold">Unverified Purchase</span>
                                             </p>
                                             {/*-- rating --*/}
                                             <div className="mb-2">
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star text-warning"></i>
                                                <span className="ms-3 text-dark fw-bold">Great product</span>
                                             </div>

                                             <p>Great product & package. Delivery can be expedited.</p>

                                             {/*-- icon --*/}
                                             <div className="d-flex justify-content-end mt-4">
                                                <a href="#" className="text-muted">
                                                   <i className="feather-icon icon-thumbs-up me-1"></i>
                                                   Helpful
                                                </a>
                                                <a href="#" className="text-muted ms-4">
                                                   <i className="feather-icon icon-flag me-2"></i>
                                                   Report abuse
                                                </a>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <a href="#" className="btn btn-outline-gray-400 text-muted">Read More Reviews</a>
                                       </div>
                                    </div>
                                    <div>
                                       {/*-- rating --*/}
                                       <h3 className="mb-5">Create Review</h3>
                                       <div className="border-bottom py-4 mb-4">
                                          <h4 className="mb-3">Overall rating</h4>
                                          <div className="rater"></div>
                                       </div>
                                       <div className="border-bottom py-4 mb-4">
                                          <h4 className="mb-0">Rate Features</h4>
                                          <div className="my-5">
                                             <h5>Flavor</h5>
                                             <div className="rater"></div>
                                          </div>
                                          <div className="my-5">
                                             <h5>Value for money</h5>
                                             <div className="rater"></div>
                                          </div>
                                          <div className="my-5">
                                             <h5>Scent</h5>
                                             <div className="rater"></div>
                                          </div>
                                       </div>
                                       {/*-- form control --*/}
                                       <div className="border-bottom py-4 mb-4">
                                          <h5>Add a headline</h5>
                                          <input type="text" className="form-control" placeholder="What’s most important to know" />
                                       </div>
                                       <div className="border-bottom py-4 mb-4">
                                          <h5>Add a photo or video</h5>
                                          <p>Shoppers find images and videos more helpful than text alone.</p>

                                          <div id="my-dropzone" className="dropzone mt-4 border-dashed rounded-2 min-h-0"></div>
                                       </div>
                                       <div className="py-4 mb-4">
                                          {/*-- heading --*/}
                                          <h5>Add a written review</h5>
                                          <textarea className="form-control" rows="3" placeholder="What did you like or dislike? What did you use this product for?"></textarea>
                                       </div>
                                       {/*-- button --*/}
                                       <div className="d-flex justify-content-end">
                                          <a href="#" className="btn btn-primary">Submit Review</a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/*-- tab pane --*/}
                        <div className="tab-pane fade" id="sellerInfo-tab-pane" role="tabpanel" aria-labelledby="sellerInfo-tab" tabindex="0">

                           <h2>Seller Informartion</h2>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

       {/* section */}
<section className="my-lg-14 my-14">
   <div className="container">

      {/* heading */}
      <div className="row">
         <div className="col-12">
            <h3>Related Items</h3>
         </div>
      </div>

      {/* swiper */}
      <Swiper
         modules={[Navigation, Autoplay]}
         spaceBetween={20}
         navigation={true}
         autoplay={{
            delay: 3000,
            disableOnInteraction: false,
         }}
         breakpoints={{
            320: {
               slidesPerView: 2,
            },
            576: {
               slidesPerView: 2,
            },
            768: {
               slidesPerView: 3,
            },
            992: {
               slidesPerView: 4,
            },
            1200: {
               slidesPerView: 4,
            },
         }}
         className="mt-4"
      >
         {
            relatedProduct.map((item) => (
               <SwiperSlide key={item.id}>

                  <div className="card card-product h-100">
                     <div className="card-body">

                        {/* badge */}
                        <div className="text-center position-relative">
                           <div className="position-absolute top-0 start-0">
                              <span className="badge bg-danger">Sale</span>
                           </div>

                           <a href="#!">
                              <img
                                 src={item.thumbnail}
                                 alt={item.name}
                                 className="mb-3 img-fluid"
                              />
                           </a>

                           {/* action btn */}
                           <div className="card-product-action">
                             {/*  <a
                                 href="#!"
                                 className="btn-action"
                                 data-bs-toggle="modal"
                                 data-bs-target="#quickViewModal"
                              >
                                 <i className="bi bi-eye"></i>
                              </a> */}

                              <NavLink
                                onClick={() => addWishListData(item)}
                                 className="btn-action"
                              >
                                 <i className="bi bi-heart"></i>
                              </NavLink>

                            {/*   <a
                                 href="#!"
                                 className="btn-action"
                              >
                                 <i className="bi bi-arrow-left-right"></i>
                              </a> */}
                           </div>
                        </div>

                        {/* heading */}
                        <div className="text-small mb-1">
                           <small className="text-muted">
                              {item.category_name}
                           </small>
                        </div>

                        <h2 className="fs-6">
                           <Link
                                 to={`/productSingle/${item.category_id}/${item.id}`}
                                 className="text-inherit text-decoration-none"
                              >
                                 {item.name}
                              </Link>
                        </h2>

                        {/* rating */}
                        <div>
                           <small className="text-warning">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-half"></i>
                           </small>

                           <span className="text-muted small">
                              4.5(149)
                           </span>
                        </div>

                        {/* price */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                           <div>
                             <span className="text-dark">
                                 Rs.{item.final_price}
                              </span>

                              {
                                 item.discount_percent > 0 && (
                                    <span className="text-decoration-line-through text-muted ms-2">
                                       Rs.{item.price}
                                    </span>
                                 )
                              }
                           </div>

                           <div>
                              <button
                                 className="btn btn-primary btn-sm"
                                 onClick={() => handleAddToCart(item)}
                              >
                                 Add to cart
                              </button>
                           </div>
                        </div>

                     </div>
                  </div>

               </SwiperSlide>
            ))
         }
      </Swiper>

   </div>
</section>
         <Footer />
      </div>
   )
}
export default ProductSingle