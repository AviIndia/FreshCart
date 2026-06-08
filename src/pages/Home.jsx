import FeaturedCategory from "../components/Categories"
import Header from "../components/Header"
import Hero from "../components/Hero"
import groceryBanner from "../assets/images/banner/grocery-banner-1.jpg";
import grocery from "../assets/images/banner/grocery-banner-2.jpg";

import Footer from "../components/Footer";
import ThreeCategoryProduct from "../components/ThreeCategoryProducts";
import { NavLink } from "react-router-dom";
const Home = ()=>{

   /* ================= GROUPED PRODUCT ================== */
   
    return(
        <>
        <Header/>
       
        <Hero/>
        <FeaturedCategory/>
        <section>
            <div className="container">
               <div className="row">
                  <div className="col-12 col-md-6 mb-3 mb-lg-0">
                     <div>
                        <div className="py-10 px-8 rounded" style={{
                                        background: `url(${grocery}) no-repeat`,
                                        backgroundSize: "cover",
                                        borderRadius: "0.5rem",
                                        backgroundPosition: "center",
                                      }}>
                           <div>
                              <h3 className="fw-bold mb-1">Dairy Products </h3>
                              <p className="mb-4">
                                 Get Upto
                                 <span className="fw-bold">30%</span>
                                 Off
                              </p>
                              <NavLink to={"/Shop"} className="btn btn-dark">Shop Now</NavLink>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 col-md-6">
                     <div>
                        <div className="py-10 px-8 rounded" style={{
                                        background: `url(${groceryBanner}) no-repeat`,
                                        backgroundSize: "cover",
                                        borderRadius: "0.5rem",
                                        backgroundPosition: "center",
                                      }}>
                           <div>
                              <h3 className="fw-bold mb-1">Fresh Fruits & Vegetables</h3>
                              <p className="mb-4">
                                 Get Upto
                                 <span className="fw-bold">25%</span>
                                 Off
                              </p>
                             <NavLink to={"/Shop"} className="btn btn-dark">Shop Now</NavLink>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>


        

         <ThreeCategoryProduct/>
         <Footer/>
        </>
    )
}
export default Home