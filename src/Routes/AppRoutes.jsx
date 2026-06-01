import { Routes, Route} from "react-router-dom"

import Home from "../pages/Home"
import ProductByCategory from "../pages/ProductByCategory"
import Cart from "../pages/Cart"
import Checkout from './../pages/Checkout';
import Notfound from "../pages/Notfound";
import ProductSingle from './../pages/ProductSingle';
import Signin from "../pages/Signin";
import Signup from './../pages/Signup';
import Wishlist from './../pages/Wishlist';
import MyOrder from './../MyAccount/MyOrder';
import MyAddress from './../MyAccount/MyAddress';
import Settings from './../MyAccount/Settings';
import PaymentMethod from "../MyAccount/PaymentMethod";
import Thankyou from "../pages/Thankyou";
import Shop from "../pages/Shop";

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/productByCategory/:id" element={<ProductByCategory/>}></Route>
            <Route path="/Cart" element={<Cart/>}></Route>
            <Route path="/Checkout" element={<Checkout/>}></Route>
            <Route path="*" element={<Notfound/>}></Route>
            <Route path="productSingle/:category_id/:id" element={<ProductSingle/>}></Route>
            <Route path="/Signin" element={<Signin/>}></Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/MyWishlist" element={<Wishlist/>}></Route>
            <Route path="/MyOrder" element={<MyOrder/>}></Route>
            <Route path="/MyAddress" element={<MyAddress/>}></Route>
            <Route path="/Settings" element={<Settings/>}></Route>
            <Route path="/MyPaymentMethods" element={<PaymentMethod/>}></Route>
            <Route path="/Thankyou" element={<Thankyou/>}></Route>
            <Route path="/Shop" element={<Shop/>}></Route>
        </Routes>
    )
}
export default AppRoutes