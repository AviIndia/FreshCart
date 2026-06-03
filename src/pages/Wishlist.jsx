import Footer from "../components/Footer"
import Header from "../components/Header"
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"
import { deleteWishList } from "../services/wishlist";
import Swal from "sweetalert2";
const Wishlist = ()=>{
   const {wishlistItem,wishCount} = useWishlist([]);
    const { addToCart } = useCart()
   console.log("Wishlist Items",wishlistItem)
   const removeWishList = async (id)=>{
      try {
         const res = await deleteWishList(id);
         if(res.status)
         {
               Swal.fire({
               icon: "success",
               title: "Success",
               text: "Wish List remove successfully !",
               });
         }
      } catch (error) {
         console.log(error)
      }
   }
    return(
    <div>{/*  */}
    <Header/>
          <div class="mt-4">
            <div class="container">
              {/* row */}
               <div class="row">
                 {/* col */}
                  <div class="col-12">
                    {/* breadcrumb */}
                     <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                           <li class="breadcrumb-item"><a href="#!">Home</a></li>
                           <li class="breadcrumb-item"><a href="#!">Shop</a></li>
                           <li class="breadcrumb-item active" aria-current="page">My Wishlist</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
        {/* section */}
         <section class="mt-8 mb-14">
            <div class="container">
              {/* row */}
               <div class="row">
                  <div class="col-lg-12">
                     <div class="mb-8">
                       {/* heading */}
                        <h1 class="mb-1">My Wishlist</h1>
                        <p>There are {wishCount} products in this wishlist.</p>
                     </div>
                     <div>
                       {/* table */}
                        <div class="table-responsive">
                           <table class="table text-nowrap table-with-checkbox">
                              <thead class="table-light">
                                 <tr>
                                    <th>
                                      {/* form check */}
                                       <div class="form-check">
                                         {/* input */}
                                          <input class="form-check-input" type="checkbox" value="" id="checkAll" />
                                         {/* label */}
                                          <label class="form-check-label" for="checkAll"></label>
                                       </div>
                                    </th>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>Remove</th>
                                 </tr>
                              </thead>
                             <tbody>
                              {wishlistItem.length > 0 ? (
                                 wishlistItem.map((item, index) => (
                                    <tr key={item.id || index}>
                                    <td className="align-middle">
                                       <div className="form-check">
                                          <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`checkbox-${index}`}
                                          />
                                          <label
                                          className="form-check-label"
                                          htmlFor={`checkbox-${index}`}
                                          ></label>
                                       </div>
                                    </td>

                                    <td className="align-middle">
                                       <img
                                          src={item.thumbnail}
                                          className="icon-shape icon-xxl"
                                          alt={item.name}
                                       />
                                    </td>

                                    <td className="align-middle">
                                       <div>
                                          <h5 className="fs-6 mb-0">
                                          <a href="#" className="text-inherit">
                                             {item.name}
                                          </a>
                                          </h5>
                                       </div>
                                    </td>

                                    <td className="align-middle">₹{item.final_price}</td>

                                    <td className="align-middle">
                                       {item.stock === 0 ? (
                                          <span className="badge bg-danger">Out Of Stock</span>
                                       ) : item.stock >= 5 ? (
                                          <span className="badge bg-success">In Stock</span>
                                       ) : (
                                          <span className="badge bg-warning">Low Stock</span>
                                       )}
                                    </td>

                                    <td className="align-middle">
                                       <button
                                          className="btn btn-primary btn-sm"
                                          onClick={() => addToCart(item, 1)}
                                       >
                                          Add to Cart
                                       </button>
                                    </td>

                                    <td className="align-middle">
                                       <button
                                          onClick={() => removeWishList(item)}
                                          className="text-muted"
                                       >
                                          <i className="feather-icon icon-trash-2"></i>
                                       </button>
                                    </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan="7" className="text-center py-5">
                                    <h5 className="mb-0">No wishlist items found</h5>
                                    </td>
                                 </tr>
                              )}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      <Footer/>
         </div>
    )

}
export default Wishlist