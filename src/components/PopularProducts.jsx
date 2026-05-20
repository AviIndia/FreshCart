import product from "../assets/images/products/product-single-img-1.jpg"
const Popularproduct = ()=>{
    return(
        <>
        <section className="my-lg-14 my-8">
            <div className="container">
               <div className="row">
                  <div className="col-12 mb-6">
                     <h3 className="mb-0">Popular Products</h3>
                  </div>
               </div>

               <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <div className="position-absolute top-0 start-0">
                                 <span className="badge bg-danger">Sale</span>
                              </div>
                              <a href="#!"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>

                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Snack & Munchies</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Haldiram's Sev Bhujia</a></h2>
                           <div>
                              <small className="text-warning">
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4.5(149)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$18</span>
                                 <span className="text-decoration-line-through text-muted">$24</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <div className="position-absolute top-0 start-0">
                                 <span className="badge bg-success">14%</span>
                              </div>
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Bakery & Biscuits</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">NutriChoice Digestive</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4.5 (25)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div><span className="text-dark">$24</span></div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                         stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Bakery & Biscuits</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Cadbury 5 Star Chocolate</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                              </small>
                              <span className="text-muted small">5 (469)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$32</span>
                                 <span className="text-decoration-line-through text-muted">$35</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                              <div className="position-absolute top-0 start-0">
                                 <span className="badge bg-danger">Hot</span>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Snack & Munchies</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Onion Flavour Potato</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                                 <i className="bi bi-star"></i>
                              </small>
                              <span className="text-muted small">3.5 (456)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$3</span>
                                 <span className="text-decoration-line-through text-muted">$5</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Instant Food</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Salted Instant Popcorn</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4.5 (39)</span>
                           </div>
                           <div className="d-flex justify-content-between mt-4">
                              <div>
                                 <span className="text-dark">$13</span>
                                 <span className="text-decoration-line-through text-muted">$18</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <div className="position-absolute top-0 start-0">
                                 <span className="badge bg-danger">Sale</span>
                              </div>
                              <a href="#!"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread & Eggs</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Blueberry Greek Yogurt</a></h2>
                           <div>
                              <small className="text-warning">
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4.5 (189)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$18</span>
                                 <span className="text-decoration-line-through text-muted">$24</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread & Eggs</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Britannia Cheese Slices</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                              </small>
                              <span className="text-muted small">5 (345)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div><span className="text-dark">$24</span></div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Instant Food</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Kellogg's Original Cereals</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4 (90)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$32</span>
                                 <span className="text-decoration-line-through text-muted">$35</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Snack & Munchies</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Slurrp Millet Chocolate</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                              </small>
                              <span className="text-muted small">4.5 (67)</span>
                           </div>
                           <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                 <span className="text-dark">$3</span>
                                 <span className="text-decoration-line-through text-muted">$5</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card card-product">
                        <div className="card-body">
                           <div className="text-center position-relative">
                              <a href="pages/shop-single.html"><img src={product} alt="Grocery Ecommerce Template" className="mb-3 img-fluid" /></a>
                              <div className="card-product-action">
                                 <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                 </a>
                                 <a href="pages/shop-wishlist.html" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist"><i className="bi bi-heart"></i></a>
                                 <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                              </div>
                           </div>
                           <div className="text-small mb-1">
                              <a href="#!" className="text-decoration-none text-muted"><small>Dairy, Bread & Eggs</small></a>
                           </div>
                           <h2 className="fs-6"><a href="pages/shop-single.html" className="text-inherit text-decoration-none">Amul Butter - 500 g</a></h2>
                           <div className="text-warning">
                              <small>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-fill"></i>
                                 <i className="bi bi-star-half"></i>
                                 <i className="bi bi-star"></i>
                              </small>
                              <span className="text-muted small">3.5 (89)</span>
                           </div>
                           <div className="d-flex justify-content-between mt-4">
                              <div>
                                 <span className="text-dark">$13</span>
                                 <span className="text-decoration-line-through text-muted">$18</span>
                              </div>
                              <div>
                                 <a href="#!" className="btn btn-primary btn-sm">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                          stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-plus">
                                       <line x1="12" y1="5" x2="12" y2="19"></line>
                                       <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="my-lg-14 my-8">
            <div className="container">
               <div className="row">
                  <div className="col-md-6 col-lg-3">
                     <div className="mb-8 mb-xl-0">
                        <div className="mb-6"><img src="../assets/images/icons/clock.svg" alt="" /></div>
                        <h3 className="h5 mb-3">10 minute grocery now</h3>
                        <p>Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
                     </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                     <div className="mb-8 mb-xl-0">
                        <div className="mb-6"><img src="assets/images/icons/gift.svg" alt="" /></div>
                        <h3 className="h5 mb-3">Best Prices & Offers</h3>
                        <p>Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers.</p>
                     </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                     <div className="mb-8 mb-xl-0">
                        <div className="mb-6"><img src="assets/images/icons/package.svg" alt="" /></div>
                        <h3 className="h5 mb-3">Wide Assortment</h3>
                        <p>Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.</p>
                     </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                     <div className="mb-8 mb-xl-0">
                        <div className="mb-6"><img src="assets/images/icons/refresh-cw.svg" alt="" /></div>
                        <h3 className="h5 mb-3">Easy Returns</h3>
                        <p>
                           Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked
                           <a href="#!">policy</a>
                           .
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        </>
    )
}
export default Popularproduct