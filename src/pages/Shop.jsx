import { useContext } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { CategoryContext } from "../context/CategoryContext"
import { NavLink } from "react-router-dom"

const Shop = () => {
    const { categories } = useContext(CategoryContext)
    return (<>
        <Header />
        <section className="mb-lg-10 mt-lg-8 my-8">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-6">
                    <h3 className="mb-0">Shop by Categories</h3>

                </div>

                <div className="row">
                     {categories.map((item, index) => (
                    <div className="col-md-2">
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
            </div>
          ))}
                </div>
                
            </div>
        </section>
        <Footer />
    </>)
}

export default Shop