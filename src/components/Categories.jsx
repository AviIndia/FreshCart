import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import dairy from "../assets/images/category/category-dairy-bread-eggs.jpg";
import snack from "../assets/images/category/category-snack-munchies.jpg";
import bakery from "../assets/images/category/category-bakery-biscuits.jpg";
import instant from "../assets/images/category/category-instant-food.jpg";
import tea from "../assets/images/category/category-tea-coffee-drinks.jpg";
import atta from "../assets/images/category/category-atta-rice-dal.jpg";
import baby from "../assets/images/category/category-baby-care.jpg";
import chicken from "../assets/images/category/category-chicken-meat-fish.jpg";
import cleaning from "../assets/images/category/category-cleaning-essentials.jpg";
import pet from "../assets/images/category/category-pet-care.jpg";

const categories = [
  {
    image: dairy,
    title: "Dairy, Bread & Eggs",
  },
  {
    image: snack,
    title: "Snack & Munchies",
  },
  {
    image: bakery,
    title: "Bakery & Biscuits",
  },
  {
    image: instant,
    title: "Instant Food",
  },
  {
    image: tea,
    title: "Tea, Coffee & Drinks",
  },
  {
    image: atta,
    title: "Atta, Rice & Dal",
  },
  {
    image: baby,
    title: "Baby Care",
  },
  {
    image: chicken,
    title: "Chicken, Meat & Fish",
  },
  {
    image: cleaning,
    title: "Cleaning Essentials",
  },
  {
    image: pet,
    title: "Pet Care",
  },
];

const FeaturedCategory = () => {
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
              <a
                href="#!"
                className="text-decoration-none text-inherit"
              >
                <div className="card card-product mb-lg-4">
                  <div className="card-body text-center py-8">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="mb-3 img-fluid"
                    />

                    <div className="text-truncate">
                      {item.title}
                    </div>

                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default FeaturedCategory;