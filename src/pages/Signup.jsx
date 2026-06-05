import Footer from "../components/Footer"
import Header from "../components/Header"
import signup from "../assets/images/signup.svg"
import Swal from "sweetalert2";
import { useState } from "react"
import { registerUser } from "../services/user";
const Signup = ()=>{

  const [formData, setFormData] = useState({
  f_name: "",
  l_name: "",
  email: "",
  phone: ""
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await registerUser(formData);

    if (res.status) {

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message
      });

      setFormData({
        f_name: "",
        l_name: "",
        email: "",
        phone: ""
      });

    }

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.response?.data?.message ||"Registration failed"
  });

   console.log(error.response?.data);

  }
};

    return(
      <>
      <Header/>
        <section className="my-lg-10 my-3">
            {/*  */}
             {/*-- container--*/}
            <div className="container">
                {/*-- row--*/}
               <div className="row justify-content-center align-items-center">
                  <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                      {/*-- img--*/}
                     <img src={signup} alt="" className="img-fluid" />
                  </div>
                   {/*-- col--*/}
                  <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                     <div className="mb-lg-9 mb-5">
                        <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                        <p>Welcome to Authentic Grocery Enter your email to get started.</p>
                     </div>
                      {/*-- form--*/}
                     <form onSubmit={handleSubmit}>
  <div className="row g-3">

    <div className="col">
      <input
        type="text"
        name="f_name"
        className="form-control"
        placeholder="First Name"
        value={formData.f_name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col">
      <input
        type="text"
        name="l_name"
        className="form-control"
        placeholder="Last Name"
        value={formData.l_name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-12">
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-12">
      <input
        type="tel"
        name="phone"
        className="form-control"
        placeholder="Mobile Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-12 d-grid">
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </div>

  </div>
</form>
                  </div>
               </div>
            </div>
         </section>
         <Footer/>
         </>
    )
}
export default Signup