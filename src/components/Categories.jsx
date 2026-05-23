import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { NavLink } from "react-router-dom";



const FeaturedCategory = () => {
  
const {categories} = useContext(CategoryContext);

  return (
    <section className="mb-lg-10 mt-lg-14 my-8">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3 className="mb-0">Featured Categories</h3>

          <div>
            <button className="category-prev btn btn-light rounded-circle me-2">
              <i className="bi bi-chevron-left"></i>
            </button>

            <button className="category-next btn btn-light rounded-circle">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
              slidesPerView: 5,
            },
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <NavLink  to={`/productByCategory/${item.id}`}
                
                className="text-decoration-none text-inherit"
              >
                <div className="card card-product mb-lg-4">
                  <div className="card-body text-center py-8">

                    <img
                      src={item.category_image}
                      alt={item.category_name}
                      className="mb-3 img-fluid"
                    />

                    <div className="text-truncate">
                      {item.category_name}
                    </div>

                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default FeaturedCategory;