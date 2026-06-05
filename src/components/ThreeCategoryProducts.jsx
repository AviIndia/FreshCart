import { useEffect, useState } from "react"
import { getHomeProducts } from "../services/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { addToGuestCart } from "../utils/cartHelper";
import { addCart } from "../services/cart";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useWishlist } from "../context/WishlistContext";
import { addWishList } from './../services/wishlist';
import Swal from "sweetalert2";
const ThreeCategoryProduct = ()=>{
  const { addWishListData } = useWishlist();
  const { addToCart } = useCart()
    const [productData, setProductData] = useState({});
     const { setCartCount,setCartItems,loadCartItems } = useCart();
    const [qty, setQty] = useState(1);
const allProducts = async () => {
   try {

      const res = await getHomeProducts();

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

// Group products by category
const groupedProducts = Object.values(
  products.reduce((acc, product) => {
    const category = product.category_name?.trim();

    if (!acc[category]) {
      acc[category] = {
        category_name: category,
        category_id: product.category_id,
        products: [],
      };
    }

    acc[category].products.push(product);

    return acc;
  }, {})
);

// Random 3 categories
const [randomCategories, setRandomCategories] = useState([]);

useEffect(() => {
  if (groupedProducts.length) {
    const shuffled = [...groupedProducts].sort(
      () => Math.random() - 0.5
    );

    setRandomCategories(shuffled.slice(0, 3));
  }
}, [products]);

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
              text: "Product Added to Cart",
              });

         }

      } catch (error) {

         console.log(error);

      }

   }

   // GUEST USER
   else {

      const updatedCart = addToGuestCart({...product,
         qty
      });

      setCartItems(updatedCart);

      setCartCount(updatedCart.length);

         Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Added to Cart! Please Login / Register For Checkout",
          });

   }

};
  
        return (
  <>
 {
  randomCategories.map((category, index) => (
    <section
      className="mb-lg-5 mt-lg-7 my-5"
      key={category.category_id}
    >
      <div className="container">

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

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.category-prev-${index}`,
            nextEl: `.category-next-${index}`,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={category.products.length > 4}
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
          {category.products.map((item) => (
            <SwiperSlide key={item.id}>

              <div className="card card-product h-100">
                <div className="card-body">

                  <div className="text-center position-relative">

                    <div className="position-absolute top-0 start-0">
                      <span className="badge bg-danger">
                        Sale
                      </span>
                    </div>

                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="mb-3 img-fluid"
                    />

                  </div>

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

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span className="text-dark">
                        Rs.{item.final_price}
                      </span>

                      <span className="text-decoration-line-through text-muted ms-2">
                        Rs.{item.price}
                      </span>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  ))
}
  </>
)
    
}
 export default ThreeCategoryProduct