import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../assets/images/slider/slider-x.jpg";
import slider2 from "../assets/images/slider/slider-z.png";
import slider3 from "../assets/images/slider/slider-y.jpg";
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
                  Authentic Groceries, Effortlessly Delivered
                </h2>

                <p className="lead ">
                  Redefining your kitchen experience with seamless online shopping and lightning-fast home delivery.
                </p>

                 <NavLink to={"/Shop"} className="btn btn-dark mt-3">
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
                  Freshness Delivered, Right to Your Door
                </h2>

                <p className="lead">
                  Experience a smarter way to shop for quality, authentic groceries from the comfort of home.
                </p>

                <NavLink to={"/Shop"} className="btn btn-dark mt-3">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </NavLink>

              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                background: `url(${slider3}) no-repeat`,
                backgroundSize: "cover",
                borderRadius: "0.5rem",
                backgroundPosition: "center",
              }}
            >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-center text-md-start">

                <span className="badge text-bg-warning">
                  Free Shipping - orders over 200
                </span>

                <h2 className="text-dark display-5 fw-bold mt-4">
                  The Future of Fresh is Just a Click Away
                </h2>

                <p className="lead">
                 Upgrade your grocery shopping with our convenient, new model designed for your busy lifestyle.
                </p>

                <NavLink to={"/Shop"} className="btn btn-dark mt-3">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </NavLink>

              </div>
            </div>
          </SwiperSlide>

        </Swiper>

      </div>
    </section>
  );
};

export default Hero;