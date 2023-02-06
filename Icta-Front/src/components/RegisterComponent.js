import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FooterComponent from './FooterComponent'
import Swal from "sweetalert2";
import Navbar from "./Navbar"
import "../../src/assets/css/login-register.css"



function RegisterComponent() {

  const url = "https://localhost:7139";


  const [fullname, setFullname] = useState();
  const [username, setUsername] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    await axios
      .post(
        `${url}/api/Account/Register`,
        {
          email: mail,
          password: password,
          fullname: fullname,
          username: username,
        },
        { "Content-Type": "multipart/form-data" }
      )
      .then(function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You registered succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
        console.log(response);
      })
      .catch(function (error) { });
  }
  return (
    <>
      <Navbar />
      <section
  id="login-register"
  style={{
    backgroundImage:
      "url(./assets/images/login-register/output-onlinejpgtools (2).jpg)"
  }}
>
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="login-register">
          <div className="user register">
            <div className="login-form">
              <form onSubmit={(e) => register(e)}>
                <h2>Sign Up</h2>
                <input onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Fullname" />
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                <input onChange={(e) => setMail(e.target.value)} type="text" placeholder="Email Address" />
                <input 
                          id="passwordId"
                          onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <input type="submit" defaultValue="Register" />
                <p className="sign-up">
                  Already have an account?<a href="login">Sign In</a>
                </p>
              </form>
            </div>
            <div className="login-img">
              <img
                style={{ width: 390, height: 500 }}
                src="/images/login-register/register.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <FooterComponent />
    </>
  );






}

export default RegisterComponent