import Footer from "../components/Footer"
import Header from "../components/Header"
import thanks from "../assets/images/thankyou.png"
import { useNavigate } from "react-router-dom";
const Thankyou = () => {
    const navigate = useNavigate();
    return (<>
        <Header />
        <section className="my-lg-14">
            <div className="container">
                 <div className="row justify-content-center align-items-center">
                   
                    <img src={thanks} style={{"height":"300px","width":"300px"}}/>
                    <h2 style={{"textAlign":"center"}}>Thanks for shopping with us !</h2>
                    <button className="btn btn-primary col-2"  onClick={() => navigate("/")}>Continue Shopping</button>
                 </div>
            </div>
        </section>
        <Footer />
    </>)
}
export default Thankyou