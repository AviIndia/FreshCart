import { useEffect, useState } from "react"
import { getAllProducts } from "../services/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { NavLink } from "react-router-dom";
const ThreeCategoryProduct = ()=>{
    const [productData, setProductData] = useState({});

const allProducts = async () => {
   try {

      const res = await getAllProducts();

      if (res.status) {
         setProductData(res.data);
      }

   } catch (error) {
      console.log(error);
   }
};

useEffect(() => {
   allProducts();
}, []);

const products = productData?.products || [];

const groupedProducts = Object.values(
   products.reduce((acc, product) => {

      const category = product.category_name;

      if (!acc[category]) {

         acc[category] = {
            category_name: category,
            products: []
         };

      }

      acc[category].products.push(product);

      return acc;

   }, {})

).slice(1, 4);


  
        return (
  <>
   {
  groupedProducts.map((category, index) => (

    <section
      className="mb-lg-5 mt-lg-7 my-5"
      key={index}
    >
      <div className="container">

        {/* heading */}
        <div className="d-flex justify-content-between align-items-center mb-5">

          <h3 className="mb-0">
            {category.category_name}
          </h3>

          <div>

            <button
              className={`category-prev-${index} btn btn-light rounded-circle me-2`}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className={`category-next-${index} btn btn-light rounded-circle`}
            >
              <i className="bi bi-chevron-right"></i>
            </button>

          </div>

        </div>

        {/* slider */}
        <Swiper
          modules={[Navigation, Autoplay]}

          navigation={{
            prevEl: `.category-prev-${index}`,
            nextEl: `.category-next-${index}`,
          }}

          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}

          loop={true}
          spaceBetween={20}

          breakpoints={{
            0: {
              slidesPerView: 1,
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
        >

          {
            category.products.map((item) => (

              <SwiperSlide key={item.id}>

                {/* product card */}
                <div className="card card-product h-100">
                  <div className="card-body">

                    {/* badge */}
                    <div className="text-center position-relative">

                      <div className="position-absolute top-0 start-0">
                        <span className="badge bg-danger">
                          Sale
                        </span>
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

                        <a
                          href="#!"
                          className="btn-action"
                          data-bs-toggle="modal"
                          data-bs-target="#quickViewModal"
                        >
                          <i className="bi bi-eye"></i>
                        </a>

                        <a
                          href="#!"
                          className="btn-action"
                        >
                          <i className="bi bi-heart"></i>
                        </a>

                        <a
                          href="#!"
                          className="btn-action"
                        >
                          <i className="bi bi-arrow-left-right"></i>
                        </a>

                      </div>

                    </div>

                    {/* heading */}
                    <div className="text-small mb-1">

                      <small className="text-muted">
                        {item.category_name}
                      </small>

                    </div>

                    <h2 className="fs-6">

                      <NavLink
                        to={`/productSingle/${item.category_id}/${item.id}`}
                        className="text-inherit text-decoration-none"
                      >
                        {item.name}
                      </NavLink>

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

                      <span className="text-muted small ms-1">
                        4.5(149)
                      </span>

                    </div>

                    {/* price */}
                    <div className="d-flex justify-content-between align-items-center mt-3">

                      <div>

                        <span className="text-dark">
                          Rs.{item.price}
                        </span>

                        <span className="text-decoration-line-through text-muted ms-2">
                          Rs.{item.final_price}
                        </span>

                      </div>

                      <div>

                        <button className="btn btn-primary btn-sm">
                          Add
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

  ))
}
  </>
)
    
}
 export default ThreeCategoryProduct