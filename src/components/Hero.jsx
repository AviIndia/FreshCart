import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../assets/images/slider/slider-4.png";
import slider2 from "../assets/images/slider/slider-2.jpg";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mt-8">
      <div className="container">

        <Swiper modules={[Autoplay, Pagination]}
          slidesPerView={1} loop={true}
          autoplay={{ delay: 3000,disableOnInteraction: false,}}
          pagination={{ clickable: true }}>

          {/* Slide 1 */}
          <SwiperSlide>
            <div
              style={{
                background: `url(${slider1}) no-repeat`,
                backgroundSize: "cover",
                borderRadius: "0.5rem",
                backgroundPosition: "center",
              }}
            >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-center text-md-start">
                
                <span className="badge text-bg-warning">
                  Opening Sale Discount 50%
                </span>

                <h2 className="text-dark display-5 fw-bold mt-4">
                  SuperMarket For Authentic Grocery
                </h2>

                <p className="lead ">
                  Introduced a new model for online grocery shopping and convenient home delivery.
                </p>

                <NavLink href="#!" className="btn btn-dark mt-3">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </NavLink>

              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              style={{
                background: `url(${slider2}) no-repeat`,
                backgroundSize: "cover",
                borderRadius: "0.5rem",
                backgroundPosition: "center",
              }}
            >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-center text-md-start">

                <span className="badge text-bg-warning">
                  Free Shipping - orders over 100
                </span>

                <h2 className="text-dark display-5 fw-bold mt-4">
                  Free Shipping on
                  <br />
                  orders over <span className="text-primary">$100</span>
                </h2>

                <p className="lead">
                  Free Shipping to First-Time Customers Only, After promotions and discounts are applied.
                </p>

                <a href="#!" className="btn btn-dark mt-3">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </a>

              </div>
            </div>
          </SwiperSlide>

        </Swiper>

      </div>
    </section>
  );
};

export default Hero;