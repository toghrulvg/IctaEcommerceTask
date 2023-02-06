import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../src/assets/css/login-register.css"
import { useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import Navbar from "./Navbar";

function LoginComponent() {
  const navigate = useNavigate();

  const url = "https://localhost:7139";

  //Prop for Api End
  const [email, setEmail] = useState();
  const [logpassword, setLogpassword] = useState();

  async function login(e) {
    e.preventDefault();

    await axios
      .post(
        `${url}/api/Account/Login`,
        {
          Email: email,
          Password: logpassword,
        }
        // { "Content-Type": "multipart/form-data" }
      )
      .then(function (response) {
        if (response.data.status === "success" || response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Signed in succesfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Email or password is wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(response);
      })
      .catch(function (error) {});

    }


  return (
    
      <div>
       <>
  <Navbar/>
  <main>
    <section
      id="login-register"
      style={{
        backgroundImage:
          "url(/images/login-register/output-onlinejpgtools (2).jpg)"
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login-register">
              <div className="user login">
                <div className="login-img">
                  <img
                    style={{ width: 390, height: 500 }}
                    src="/images/login-register/login.jpg"
                    alt=""
                  />
                </div>
                <div className="login-form">
                  <form onSubmit={(e) => login(e)}>
                    <h2>Sign In</h2>
                    <input type="text" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" 
                    onChange={(e) => setLogpassword(e.target.value)}/>
                    <input type="submit" defaultValue="Login" />
                    <p className="sign-up">
                      Don't have an account?<a href="register.html">Sign Up</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <FooterComponent/>
</>

      </div>

  )
}

export default LoginComponent