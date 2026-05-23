import Footer from "../components/Footer"
import Header from "../components/Header"
import { useContext, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CategoryContext } from './../context/CategoryContext';
import { productBycategory } from './../services/products';
import { Pagination } from 'swiper/modules';



const ProductByCategory = ()=>{
    const {categories} = useContext(CategoryContext)
    const { id } = useParams();
      const [productData, setProductData] = useState([]);
      const [categorydata,setCategoryData] = useState({});
      const [pagination,setPagination] = useState({});
      const [currentPage, setCurrentPage] = useState(1);
      const [sortBy, setSortBy] = useState("latest");
      const [limit, setLimit] = useState(12);
 const fetchProductById = async (page = 1,sort = sortBy,productLimit = limit) => {

    try {

      const res = await productBycategory(id,page,sort,productLimit);

      if (res.status) {

        setProductData(res.data.products);
        setCategoryData(res.data.category);
        setPagination(res.data.pagination);

        console.log(
          "Fetched Product by id",
          res.data
        );
      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

     fetchProductById(currentPage,sortBy,limit);

  }, [id,currentPage,sortBy,limit]);

const handlePageChange = (page) => {

  if (
    page >= 1 &&
    page <= pagination.total_pages
  ) {
    setCurrentPage(page);
  }

};

const handleSortChange = (e) => {

  setSortBy(e.target.value);

  // Reset to first page after filter
  setCurrentPage(1);

};

const handleLimitChange = (e) => {

  setLimit(e.target.value);

  // reset pagination
  setCurrentPage(1);

};

    return(
      <>
      <Header/>
       {/*-- section */}
         <div className="mt-4">
            <div className="container">
              {/*-- row  */}
               <div className="row">
                 {/*-- col  */}
                  <div className="col-12">
                    {/*-- breadcrumb  */}
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                           <li className="breadcrumb-item"><a href="#!">Home</a></li>
                           <li className="breadcrumb-item"><a href="#!">Shop</a></li>
                           <li className="breadcrumb-item active" aria-current="page">{categorydata?.category_name}</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
        {/*-- section  */}
         <div className="mt-8 mb-lg-14 mb-8">
           {/*-- container  */}
            <div className="container">
              {/*-- row  */}
               <div className="row gx-10">
                 {/*-- col  */}
                  <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
                     <div className="offcanvas offcanvas-start offcanvas-collapse w-md-50" tabindex="-1" id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">
                        <div className="offcanvas-header d-lg-none">
                           <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Filter</h5>
                           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body ps-lg-2 pt-lg-0">
                           <div className="mb-8">
                             {/*-- title  */}
                              <h5 className="mb-3">Categories</h5>
                             {/*-- nav  */}
                              <ul className="nav nav-category" id="categoryCollapseMenu">
                                 {categories?.map((item) => (

                                       <li
                                          className="nav-item border-bottom w-100"
                                          key={item.id}
                                       >

                                          <NavLink
                                          className="nav-link"
                                          to={`/productByCategory/${item.id}`}
                                          >
                                          {item.category_name}

                                          <i className="feather-icon icon-chevron-right"></i>
                                          </NavLink>

                                       </li>

                                    ))}
                                                            
                              </ul>
                           </div>

                           <div className="mb-8">
                              <h5 className="mb-3">Stores</h5>
                              <div className="my-4">
                                {/*-- input  */}
                                 <input type="search" className="form-control" placeholder="Search by store" />
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="eGrocery" checked />
                                 <label className="form-check-label" for="eGrocery">E-Grocery</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="DealShare" />
                                 <label className="form-check-label" for="DealShare">DealShare</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="Dmart" />
                                 <label className="form-check-label" for="Dmart">DMart</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="Blinkit" />
                                 <label className="form-check-label" for="Blinkit">Blinkit</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="BigBasket" />
                                 <label className="form-check-label" for="BigBasket">BigBasket</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="StoreFront" />
                                 <label className="form-check-label" for="StoreFront">StoreFront</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="Spencers" />
                                 <label className="form-check-label" for="Spencers">Spencers</label>
                              </div>
                             {/*-- form check  */}
                              <div className="form-check mb-2">
                                {/*-- input  */}
                                 <input className="form-check-input" type="checkbox" value="" id="onlineGrocery" />
                                 <label className="form-check-label" for="onlineGrocery">Online Grocery</label>
                              </div>
                           </div>
                           <div className="mb-8">
                             {/*-- price  */}
                              <h5 className="mb-3">Price</h5>
                              <div>
                                {/*-- range  */}
                                 <div id="priceRange" className="mb-3"></div>
                                 <small className="text-muted">Price:</small>
                                 <span id="priceRange-value" className="small"></span>
                              </div>
                           </div>
                          {/*-- rating  */}
                           <div className="mb-8">
                              <h5 className="mb-3">Rating</h5>
                              <div>
                                {/*-- form check  */}
                                 <div className="form-check mb-2">
                                   {/*-- input  */}
                                    <input className="form-check-input" type="checkbox" value="" id="ratingFive" />
                                    <label className="form-check-label" for="ratingFive">
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                    </label>
                                 </div>
                                {/*-- form check  */}
                                 <div className="form-check mb-2">
                                   {/*-- input  */}
                                    <input className="form-check-input" type="checkbox" value="" id="ratingFour" checked />
                                    <label className="form-check-label" for="ratingFour">
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                    </label>
                                 </div>
                                {/*-- form check  */}
                                 <div className="form-check mb-2">
                                   {/*-- input  */}
                                    <input className="form-check-input" type="checkbox" value="" id="ratingThree" />
                                    <label className="form-check-label" for="ratingThree">
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                    </label>
                                 </div>
                                {/*-- form check  */}
                                 <div className="form-check mb-2">
                                   {/*-- input  */}
                                    <input className="form-check-input" type="checkbox" value="" id="ratingTwo" />
                                    <label className="form-check-label" for="ratingTwo">
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                    </label>
                                 </div>
                                {/*-- form check  */}
                                 <div className="form-check mb-2">
                                   {/*-- input  */}
                                    <input className="form-check-input" type="checkbox" value="" id="ratingOne" />
                                    <label className="form-check-label" for="ratingOne">
                                       <i className="bi bi-star-fill text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                       <i className="bi bi-star text-warning"></i>
                                    </label>
                                 </div>
                              </div>
                           </div>
                           <div className="mb-8 position-relative">
                             {/*-- Banner Design  */}
                             {/*-- Banner Content  */}
                              <div className="position-absolute p-5 py-8">
                                 <h3 className="mb-0">Fresh Fruits</h3>
                                 <p>Get Upto 25% Off</p>
                                 <a href="#" className="btn btn-dark">
                                    Shop Now
                                    <i className="feather-icon icon-arrow-right ms-1"></i>
                                 </a>
                              </div>
                             {/*-- Banner Content  */}
                             {/*-- Banner Image  */}
                             {/*-- img  */}
                              <img src="../assets/images/banner/assortment-citrus-fruits.png" alt="" className="img-fluid rounded" />
                             {/*-- Banner Image  */}
                           </div>
                        </div>
                     </div>
                  </aside>
                  <section className="col-lg-9 col-md-12">
                    {/*-- card  */}
                     <div className="card mb-4 bg-light border-0">
                       {/*-- card body  */}
                        <div className="card-body p-9">
                           <h2 className="mb-0 fs-1">{categorydata?.category_name}</h2>
                        </div>
                     </div>
                    {/*-- list icon  */}
                     <div className="d-lg-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-lg-0">
                           <p className="mb-0">
                              <span className="text-dark">{pagination?.total_products} </span>
                              Products found
                           </p>
                        </div>

                       {/*-- icon  */}
                        <div className="d-md-flex justify-content-between align-items-center">
                           <div className="d-flex align-items-center justify-content-between">
                              <div>
                                 <a href="shop-list.html" className="text-muted me-3"><i className="bi bi-list-ul"></i></a>
                                 <a href="shop-grid.html" className="me-3 text-muted"><i className="bi bi-grid"></i></a>
                                 <a href="shop-grid-3-column.html" className="me-3 active"><i className="bi bi-grid-3x3-gap"></i></a>
                              </div>
                              <div className="ms-2 d-lg-none">
                                 <a className="btn btn-outline-gray-400 text-muted" data-bs-toggle="offcanvas" href="#offcanvasCategory" role="button" aria-controls="offcanvasCategory">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="14"
                                       height="14"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       stroke-width="2"
                                       stroke-linecap="round"
                                       stroke-linejoin="round"
                                       className="feather feather-filter me-2">
                                       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                    </svg>
                                    Filters
                                 </a>
                              </div>
                           </div>

                           <div className="d-flex mt-2 mt-lg-0">
                              <div className="me-2 flex-grow-1">
                                {/*-- select option  */}
                                 <select className="form-select" value={limit} onChange={handleLimitChange}>

                                    <option value="50">Show: 50</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>

                                    </select>
                              </div>
                              <div>
                                {/*-- select option  */}
                                 <select className="form-select" value={sortBy} onChange={handleSortChange} >

                                    <option value="featured">Sort by: Featured</option>

                                    <option value="price_low_to_high"> Price: Low to High</option>

                                    <option value="price_high_to_low">Price: High to Low </option>

                                    <option value="latest">Latest</option>

                                    </select>
                              </div>
                           </div>
                        </div>
                     </div>
                    {/*=================== Single Product =======================  */}
                     <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                       {/*-- col  */}
                       
                        {
  productData.map((item) => (
    <div className="col" key={item.id}>
      {/*-- card  */}
      <div className="card card-product">
        <div className="card-body">

          {/* badge */}
          <div className="text-center position-relative">
            <div className="position-absolute top-0 start-0">
              <span className="badge bg-danger">
                {item.discount_percent > 0 ? "Sale" : ""}
              </span>
            </div>

            <a href="shop-single.html">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="mb-3 img-fluid"
              />
            </a>

            {/* action btn */}
            <div className="card-product-action">
              <a
                href="#!"
                className="btn-action"
                data-bs-toggle="modal"
                data-bs-target="#quickViewModal"
              >
                <i
                  className="bi bi-eye"
                  data-bs-toggle="tooltip"
                  data-bs-html="true"
                  title="Quick View"
                ></i>
              </a>

              <a
                href="shop-wishlist.html"
                className="btn-action"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="Wishlist"
              >
                <i className="bi bi-heart"></i>
              </a>

              <a
                href="#!"
                className="btn-action"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="Compare"
              >
                <i className="bi bi-arrow-left-right"></i>
              </a>
            </div>
          </div>

          {/* category */}
          <div className="text-small mb-1">
            <a
              href="#!"
              className="text-decoration-none text-muted"
            >
              <small>{categorydata.category_name}</small>
            </a>
          </div>

          {/* product name */}
          <h2 className="fs-6">
            <a
              href="shop-single.html"
              className="text-inherit text-decoration-none"
            >
              {item.name}
            </a>
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
              {item.average_rating} ({item.total_reviews})
            </span>
          </div>

          {/* price */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-dark me-2">
                ₹{item.final_price}
              </span>

              <span className="text-decoration-line-through text-muted">
                ₹{item.price}
              </span>
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
                  className="feather feather-plus"
                >
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
  ))
}
                        {/* ================== End product data=========================== */}
 
                     </div>
                     
                    <div className="row mt-8">
  <div className="col">

    <nav>
      <ul className="pagination">

        {/* Previous Button */}
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link mx-1"
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
          >
            <i className="feather-icon icon-chevron-left"></i>
          </button>
        </li>

        {/* Page Numbers */}
        {
          [...Array(pagination.total_pages)].map((_, index) => {

            const page = index + 1;

            return (
              <li
                className="page-item"
                key={page}
              >
                <button
                  className={`page-link mx-1 ${
                    currentPage === page
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePageChange(page)
                  }
                >
                  {page}
                </button>
              </li>
            );
          })
        }

        {/* Next Button */}
        <li
          className={`page-item ${
            currentPage === pagination.total_pages
              ? "disabled"
              : ""
          }`}
        >
          <button
            className="page-link mx-1"
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
          >
            <i className="feather-icon icon-chevron-right"></i>
          </button>
        </li>

      </ul>
    </nav>

  </div>
</div>
                  </section>
               </div>
            </div>
         </div>
         <Footer/>
      </>
     
    )
}
export default ProductByCategory